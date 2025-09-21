package databases

import (
	"from-trash-to-cash/databases/db"
	"from-trash-to-cash/databases/rdb"
	"log"

	"github.com/jackc/pgx/v5/pgxpool"
	"github.com/redis/go-redis/v9"
)

var (
	DB  *pgxpool.Pool
	RDB *redis.Client
)

func Init() {
	var err error
	DB, err = db.Connect_to_db()
	if err != nil {
		log.Fatal(err)
	}

	RDB, err = rdb.Connect_to_rdb()
	if err != nil {
		log.Fatal(err)
	}
}
