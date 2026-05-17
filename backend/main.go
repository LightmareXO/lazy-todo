package main

import (
	"context"
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"os"
	"sync"
	"crypto/rand"

	"github.com/joho/godotenv"

	"golang.org/x/oauth2"
	"golang.org/x/oauth2/google"
	"google.golang.org/api/option"
	"google.golang.org/api/tasks/v1"
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

func generateState() string {
	return rand.Text()
}

func createTaskHandler(conf *oauth2.Config, frontendURL string) http.HandlerFunc {
	return func (w http.ResponseWriter, r *http.Request) {

		w.Header().Set("Access-Control-Allow-Origin", frontendURL)
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

		state := generateState()

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

		client := conf.Client(r.Context(), tok)

		service, err := tasks.NewService(
			r.Context(),
			option.WithHTTPClient(client),
		)

		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}

		due := task.DueDate + "T00:00:00.000Z"

		googleTask := &tasks.Task{
			Title: task.Name,
			Due: due,
		}

		_, err = service.Tasks.Insert("@default", googleTask).Do()

		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}
	
		w.Header().Set("Content-Type", "text/html; charset=utf-8")

		fmt.Fprint(w, `
			<html>
				<body>
					<script>
						window.close();
					</script>
					<p>completed</p>
				</body>
			</html>
		`)
	}
}

func main() {
	envLoad()
	clientSecret := os.Getenv("GOOGLE_CLIENT_SECRET")
	clientID := os.Getenv("GOOGLE_CLIENT_ID")
	redirectURL := os.Getenv("GOOGLE_REDIRECT_URL")
	frontendURL := os.Getenv("FRONTEND_URL")
	port := os.Getenv("PORT")

	conf := &oauth2.Config{
		ClientID:     clientID,
		ClientSecret: clientSecret,
		RedirectURL:  redirectURL,
		Scopes:       []string{"https://www.googleapis.com/auth/tasks"},
		Endpoint:     google.Endpoint,
	}

	http.HandleFunc("/api/tasks/create", createTaskHandler(conf, frontendURL))
	http.HandleFunc("/auth/google/callback", googleCallbackHandler(conf))

	log.Fatal(http.ListenAndServe(":"+port, nil))
}