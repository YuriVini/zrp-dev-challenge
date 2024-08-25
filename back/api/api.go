package api

import (
	"back/store/pgstore"
	"back/token"
	"encoding/json"
	"errors"
	"log/slog"
	"net/http"

	"github.com/go-chi/chi/middleware"
	"github.com/go-chi/chi/v5"
	"github.com/go-chi/cors"
	"github.com/google/uuid"
	"github.com/jackc/pgx"
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
		r.Post("/login", a.authenticate)
		r.Post("/register", a.createUser)

		r.Route("/user", func(r chi.Router) {

			r.Get("/{user_id}", a.getUser)
		})

		r.Route("/heroes", func(r chi.Router) {
			r.Post("/", a.createHero)
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

func (h apiHandler) authenticate(w http.ResponseWriter, r *http.Request) {
	type _body struct {
		Email    string `json:"email"`
		Password string `json:"password"`
	}
	var body _body

	if err := json.NewDecoder(r.Body).Decode(&body); err != nil {
		http.Error(w, "Invalid json", http.StatusBadRequest)
		return
	}

	user, err := h.q.GetUserByEmail(r.Context(), body.Email)
	if err != nil {
		if errors.Is(err, pgx.ErrNoRows) {
			http.Error(w, "User not found", http.StatusBadRequest)
			return
		}

		http.Error(w, "Something went wrong", http.StatusInternalServerError)
		return
	}

	if body.Password == user.Password {
		type LoginResponse struct {
			Token  string `json:"token"`
			UserID string `json:"user_id"`
		}

		tokenString, err := token.CreateToken(body.Email)
		if err != nil {
			w.WriteHeader(http.StatusInternalServerError)
		}

		data, err := json.Marshal(LoginResponse{Token: tokenString, UserID: user.ID.String()})
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
	} else {
		http.Error(w, "Invalid credentials", http.StatusUnauthorized)
	}
}

func (h apiHandler) getUser(w http.ResponseWriter, r *http.Request) {
	type GetUserResponse struct {
		Name  string `json:"name"`
		Email string `json:"email"`
	}

	err := token.ProtectedHandler(w, r)
	if err != nil {
		return
	}

	rawUserID := chi.URLParam(r, "user_id")
	userID, err := uuid.Parse(rawUserID)
	if err != nil {
		http.Error(w, "Invalid user ID", http.StatusBadRequest)
		return
	}

	user, err := h.q.GetUser(r.Context(), userID)
	if err != nil {
		if errors.Is(err, pgx.ErrNoRows) {
			http.Error(w, "User not found", http.StatusBadRequest)
			return
		}

		http.Error(w, "Something went wrong", http.StatusInternalServerError)
		return
	}

	data, err := json.Marshal(GetUserResponse{Name: user.Name, Email: user.Email})
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
}

func (h apiHandler) createHero(w http.ResponseWriter, r *http.Request) {
	err := token.ProtectedHandler(w, r)
	if err != nil {
		return
	}

	type _body struct {
		Name     string `json:"name"`
		Rank     string `json:"rank"`
		ImageUrl string `json:"image_url"`
	}

	var body _body

	if err := json.NewDecoder(r.Body).Decode(&body); err != nil {
		http.Error(w, "Invalid json", http.StatusBadRequest)
		return
	}

	heroID, err := h.q.InsertHero(r.Context(), pgstore.InsertHeroParams{Name: body.Name, Rank: body.Rank, ImageUrl: body.ImageUrl})
	if err != nil {
		http.Error(w, "Something went wrong", http.StatusInternalServerError)
		return
	}

	slog.Info("Heroes insertted", "id: ", heroID)

	type CreateHeroResponse struct {
		ID string `json:"id"`
	}

	data, err := json.Marshal(CreateHeroResponse{ID: heroID.String()})
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
}

}
