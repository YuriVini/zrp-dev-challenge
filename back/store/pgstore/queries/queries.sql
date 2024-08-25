-- name: GetUser :one
SELECT 
    "id", "name", "email"
FROM users
WHERE id = $1;

-- name: GetUserByEmail :one
SELECT 
    "id", "name", "email", "password"
FROM users
WHERE email = $1;

-- name: InsertUser :one
INSERT INTO users 
    ("name", "email", "password") VALUES
    ($1, $2, $3)
RETURNING "id";

-- name: InsertHero :one
INSERT INTO heroes 
    ("name", "rank", "image_url") VALUES
    ($1, $2, $3)
RETURNING "id";

-- name: GetHeroes :many
SELECT 
    "id", "name", "rank", "image_url"
FROM heroes;

-- name: UpdateHero :one
UPDATE heroes
SET
    name = $2,
    image_url = $3,
    rank = $4
WHERE
    id = $1
RETURNING id, name, image_url, rank;
