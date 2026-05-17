package main

import (
	"context"
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"os"
	"sync"

	"github.com/joho/godotenv"

	"golang.org/x/oauth2"
	"golang.org/x/oauth2/google"
)

func envLoad() {
	_ = godotenv.Load()
}

type TaskRequest struct {
	Name string `json:"name"`
	DueDate string `json:"dueDate"`
	DueTime string `json:"dueTime"`
}

var pendingTasks = map[string]TaskRequest{}
var pendingTasksMutex sync.Mutex



func googleLoginHandler(conf *oauth2.Config) http.HandlerFunc {
	return func (w http.ResponseWriter, r *http.Request) {
		url := conf.AuthCodeURL("random-state")
		http.Redirect(w, r, url, http.StatusTemporaryRedirect)
	}
}

func createTaskHandler(conf *oauth2.Config) http.HandlerFunc {
	return func (w http.ResponseWriter, r *http.Request) {

		w.Header().Set("Access-Control-Allow-Origin", "http://localhost:5173")
		w.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS")
		w.Header().Set("Access-Control-Allow-Headers", "Content-Type")

		if r.Method == http.MethodOptions {
			w.WriteHeader(http.StatusNoContent)
			return
		}

		var task TaskRequest

		err := json.NewDecoder(r.Body).Decode(&task)
		if err != nil {
			http.Error(w, err.Error(), http.StatusBadRequest)
			return
		}

		fmt.Println(task.Name)
		fmt.Println(task.DueDate)
		fmt.Println(task.DueTime)

		state := "random-state"

		pendingTasksMutex.Lock()
		pendingTasks[state] = task
		pendingTasksMutex.Unlock()

		url := conf.AuthCodeURL(state)
		
		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(map[string]string{
			"authUrl": url,
		})
	}
}
func googleCallbackHandler(conf *oauth2.Config) http.HandlerFunc {
	return func (w http.ResponseWriter, r *http.Request) {
		code := r.URL.Query().Get("code")
		if code == "" {
			http.Error(w, "no code", http.StatusBadRequest)
			return
		}

		state := r.URL.Query().Get("state")
		if state == "" {
			http.Error(w, "no state", http.StatusBadRequest)
			return
		}

		tok, err := conf.Exchange(context.Background(), code)

		pendingTasksMutex.Lock()
		task, ok := pendingTasks[state]
		if ok {
			delete(pendingTasks, state)
		}
		pendingTasksMutex.Unlock()
		if !ok {
			http.Error(w, "task not found", http.StatusBadRequest)
			return
		}

		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}

		_ = tok

		fmt.Println("callback", task.Name, task.DueDate, task.DueTime);
	}
}

func main() {
	envLoad()
	clientSecret := os.Getenv("GOOGLE_CLIENT_SECRET")
	clientID := os.Getenv("GOOGLE_CLIENT_ID")
	redirectURL := os.Getenv("GOOGLE_REDIRECT_URL")

	conf := &oauth2.Config{
		ClientID:     clientID,
		ClientSecret: clientSecret,
		RedirectURL:  redirectURL,
		Scopes:       []string{"https://www.googleapis.com/auth/tasks"},
		Endpoint:     google.Endpoint,
	}

	fmt.Println("clientID:", clientID)
	fmt.Println("redirectURL:", redirectURL)

	http.HandleFunc("/auth/google", googleLoginHandler(conf))
	http.HandleFunc("/auth/google/callback", googleCallbackHandler(conf))
	http.HandleFunc("/api/tasks/create", createTaskHandler(conf))

	log.Fatal(http.ListenAndServe(":8080", nil))
}