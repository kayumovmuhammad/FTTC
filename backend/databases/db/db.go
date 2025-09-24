package db

import (
	"context"
	"fmt"
	"log"

	"github.com/jackc/pgx/v5/pgxpool"
	"github.com/joho/godotenv"
)

func Connect_to_db() (*pgxpool.Pool, error) {
	err := godotenv.Load()
	if err != nil {
		log.Fatal("Ошибка загрузки .env:", err)
	}

	connectStr := fmt.Sprintf(
		"postgresql://technical_store_g444_user:RuJPKNYt98IFIC8L717Zzk6bzgh5hUkl@dpg-d2njhmh5pdvs73bajs50-a.oregon-postgres.render.com/technical_store_g444",
	)

	pool, err := pgxpool.New(context.Background(), connectStr)
	if err != nil {
		return nil, fmt.Errorf("не удалось подключиться к БД: %v", err)
	}

	if err := pool.Ping(context.Background()); err != nil {
		return nil, fmt.Errorf("ping не прошел: %v", err)
	}

	_, err = pool.Exec(context.Background(), `
		CREATE TABLE IF NOT EXISTS temp_users(
			id SERIAL PRIMARY KEY,
			email TEXT NOT NULL,
			email_password TEXT NOT NULL,
			login TEXT NOT NULL,
			temp_code INT NOT NULL,
			finish_time TIMESTAMP
		)
	`)
	if err != nil {
		log.Fatal(err)
	}

	_, err = pool.Exec(context.Background(), `
    CREATE TABLE IF NOT EXISTS users(
			id SERIAL PRIMARY KEY,
			email TEXT NOT NULL,
			password TEXT NOT NULL,
			login TEXT NOT NULL
    	)
	`)
	if err != nil {
		log.Fatal(err)
	}

	_, err = pool.Exec(context.Background(), `
		CREATE TABLE IF NOT EXISTS orders(
			id SERIAL PRIMARY KEY,
			price INT NOT NULL,
			description TEXT NOT NULL,
			title TEXT NOT NULL,
			created_at TIMESTAMP NOT NULL,
			phone TEXT NOT NULL,
			email TEXT NOT NULL,
			category TEXT NOT NULL,
			image_url TEXT[] NOT NULL,
			payment INT NOT NULL,
			adress TEXT NOT NULL
		)
	`)
	if err != nil {
		log.Fatal(err)
	}

	return pool, nil
}
