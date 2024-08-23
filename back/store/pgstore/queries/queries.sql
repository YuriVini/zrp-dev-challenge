-- name: GetUser :one
SELECT 
    "id", "name", "email"
FROM users
WHERE id = $1;

-- name: GetUserByEmail :one
SELECT 
    "id", "name", "email"
FROM users
WHERE email = $1;

-- name: InsertUser :one
INSERT INTO users 
    ("name", "email", "password") VALUES
    ($1, $2, $3)
RETURNING "id";