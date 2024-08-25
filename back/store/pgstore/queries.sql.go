// Code generated by sqlc. DO NOT EDIT.
// versions:
//   sqlc v1.27.0
// source: queries.sql

package pgstore

import (
	"context"

	"github.com/google/uuid"
)

const deleteHero = `-- name: DeleteHero :exec
DELETE FROM heroes
WHERE id = $1
`

func (q *Queries) DeleteHero(ctx context.Context, id uuid.UUID) error {
	_, err := q.db.Exec(ctx, deleteHero, id)
	return err
}

const getHeroes = `-- name: GetHeroes :many
SELECT 
    "id", "name", "rank", "image_url"
FROM heroes
`

func (q *Queries) GetHeroes(ctx context.Context) ([]Hero, error) {
	rows, err := q.db.Query(ctx, getHeroes)
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	var items []Hero
	for rows.Next() {
		var i Hero
		if err := rows.Scan(
			&i.ID,
			&i.Name,
			&i.Rank,
			&i.ImageUrl,
		); err != nil {
			return nil, err
		}
		items = append(items, i)
	}
	if err := rows.Err(); err != nil {
		return nil, err
	}
	return items, nil
}

const getUser = `-- name: GetUser :one
SELECT 
    "id", "name", "email"
FROM users
WHERE id = $1
`

type GetUserRow struct {
	ID    uuid.UUID
	Name  string
	Email string
}

func (q *Queries) GetUser(ctx context.Context, id uuid.UUID) (GetUserRow, error) {
	row := q.db.QueryRow(ctx, getUser, id)
	var i GetUserRow
	err := row.Scan(&i.ID, &i.Name, &i.Email)
	return i, err
}

const getUserByEmail = `-- name: GetUserByEmail :one
SELECT 
    "id", "name", "email", "password"
FROM users
WHERE email = $1
`

func (q *Queries) GetUserByEmail(ctx context.Context, email string) (User, error) {
	row := q.db.QueryRow(ctx, getUserByEmail, email)
	var i User
	err := row.Scan(
		&i.ID,
		&i.Name,
		&i.Email,
		&i.Password,
	)
	return i, err
}

const insertHero = `-- name: InsertHero :one
INSERT INTO heroes 
    ("name", "rank", "image_url") VALUES
    ($1, $2, $3)
RETURNING "id"
`

type InsertHeroParams struct {
	Name     string
	Rank     string
	ImageUrl string
}

func (q *Queries) InsertHero(ctx context.Context, arg InsertHeroParams) (uuid.UUID, error) {
	row := q.db.QueryRow(ctx, insertHero, arg.Name, arg.Rank, arg.ImageUrl)
	var id uuid.UUID
	err := row.Scan(&id)
	return id, err
}

const insertUser = `-- name: InsertUser :one
INSERT INTO users 
    ("name", "email", "password") VALUES
    ($1, $2, $3)
RETURNING "id"
`

type InsertUserParams struct {
	Name     string
	Email    string
	Password string
}

func (q *Queries) InsertUser(ctx context.Context, arg InsertUserParams) (uuid.UUID, error) {
	row := q.db.QueryRow(ctx, insertUser, arg.Name, arg.Email, arg.Password)
	var id uuid.UUID
	err := row.Scan(&id)
	return id, err
}

const updateHero = `-- name: UpdateHero :one
UPDATE heroes
SET
    name = $2,
    image_url = $3,
    rank = $4
WHERE
    id = $1
RETURNING id, name, image_url, rank
`

type UpdateHeroParams struct {
	ID       uuid.UUID
	Name     string
	ImageUrl string
	Rank     string
}

type UpdateHeroRow struct {
	ID       uuid.UUID
	Name     string
	ImageUrl string
	Rank     string
}

func (q *Queries) UpdateHero(ctx context.Context, arg UpdateHeroParams) (UpdateHeroRow, error) {
	row := q.db.QueryRow(ctx, updateHero,
		arg.ID,
		arg.Name,
		arg.ImageUrl,
		arg.Rank,
	)
	var i UpdateHeroRow
	err := row.Scan(
		&i.ID,
		&i.Name,
		&i.ImageUrl,
		&i.Rank,
	)
	return i, err
}
