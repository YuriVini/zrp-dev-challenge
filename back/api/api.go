package api

import (
	"back/store/pgstore"
	"encoding/json"
	"log/slog"
	"net/http"

	"github.com/go-chi/chi/middleware"
	"github.com/go-chi/chi/v5"
	"github.com/go-chi/cors"
)

type apiHandler struct {
	q *pgstore.Queries
	r *chi.Mux
}

func (h apiHandler) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	h.r.ServeHTTP(w, r)
}

func NewHandler(q *pgstore.Queries) http.Handler {
	a := apiHandler{
		q: q,
	}

	r := chi.NewMux()

	r.Use(middleware.RequestID, middleware.Recoverer, middleware.Logger)
	r.Use(cors.Handler(cors.Options{
		AllowedOrigins:   []string{"https://*", "http://*"},
		AllowedMethods:   []string{"GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"},
		AllowedHeaders:   []string{"Accept", "Authorization", "Content-Type", "X-CSRF-Token"},
		ExposedHeaders:   []string{"Link"},
		AllowCredentials: false,
		MaxAge:           300,
	}))

	r.Route("/api", func(r chi.Router) {
		r.Route("/user", func(r chi.Router) {
			r.Post("/", a.createUser)
		})
	})

	return r
}

func (h apiHandler) createUser(w http.ResponseWriter, r *http.Request) {
	type CreateUserResponse struct {
		ID string `json:"id"`
	}

	type _body struct {
		Name     string `json:"name"`
		Email    string `json:"email"`
		Password string `json:"password"`
	}
	var body _body

	if err := json.NewDecoder(r.Body).Decode(&body); err != nil {
		http.Error(w, "Invalid json", http.StatusBadRequest)
		return
	}

	_, err := h.q.GetUserByEmail(r.Context(), body.Email)
	if err != nil {
		id, err := h.q.InsertUser(r.Context(), pgstore.InsertUserParams{Name: body.Name, Email: body.Email, Password: body.Password})
		if err != nil {
			slog.Error("Failed to insert user", "error", err)
			http.Error(w, "Something went wrong", http.StatusInternalServerError)
			return
		}

		data, err := json.Marshal(CreateUserResponse{ID: id.String()})
		if err != nil {
			slog.Error("Failed to Marshal", "error", err)
			http.Error(w, "Something went wrong", http.StatusInternalServerError)
			return
		}

		w.Header().Set("Content-Type", "application/json")
		_, err = w.Write(data)
		if err != nil {
			slog.Error("Failed to Write", "error", err)
			http.Error(w, "Something went wrong", http.StatusInternalServerError)
			return
		}
		return
	}

	http.Error(w, "Email already in use", http.StatusConflict)
}
