package main

import (
	"fmt"
	"os/exec"

	"github.com/joho/godotenv"
)

func main() {
	if err := godotenv.Load(); err != nil {
		fmt.Println("Failed to load Envs", err)
		panic(err)
	}
	cmd := exec.Command(
		"tern",
		"migrate",
		"--migrations",
		"./store/pgstore/migrations",
		"--config",
		"./store/pgstore/migrations/tern.conf",
	)

	if err := cmd.Run(); err != nil {
		fmt.Println("Failed to migrate", err)
		panic(err)
	}
}
