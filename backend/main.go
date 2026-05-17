package main

import (
	"context"
	"fmt"
	"log"
	"net/http"
	"os"

	"github.com/joho/godotenv"

	"golang.org/x/oauth2"
	"golang.org/x/oauth2/google"
)

func envLoad() {
	_ = godotenv.Load()
}

func googleLoginHandler(conf *oauth2.Config) http.HandlerFunc {
	return func (w http.ResponseWriter, r *http.Request) {
		url := conf.AuthCodeURL("random-state")
		http.Redirect(w, r, url, http.StatusTemporaryRedirect)
	}
}

func googleCallbackHandler(conf *oauth2.Config) http.HandlerFunc {
	return func (w http.ResponseWriter, r *http.Request) {
		code := r.URL.Query().Get("code")
		if code == "" {
			http.Error(w, "no code", http.StatusBadRequest)
			return
		}
		tok, err := conf.Exchange(context.Background(), code)
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}

		_ = tok

		fmt.Fprintln(w, "success")
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

	log.Fatal(http.ListenAndServe(":8080", nil))
}