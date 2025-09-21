package user

import (
	"context"
	"from-trash-to-cash/databases"
	"from-trash-to-cash/models"
	"sort"
	"time"
)

func Create_order(order models.Order) error {
	db := databases.DB
	ctx := context.Background()

	created_at := time.Now()
	_, err := db.Exec(ctx, `INSERT INTO orders(price , description , title , created_at , phone , email , category , image_url , payment , adress) VALUES ($1 , $2 , $3 , $4 , $5 , $6 , $7 , $8 , $9 , $10)`,
		order.Price, order.Description, order.Title, created_at, order.Phone, order.Email, order.Category, order.Image_url, order.Payment, order.Adress)
	if err != nil {
		return err
	}

	return nil
}

func Create_more_orders(orders []models.Order) error {
	db := databases.DB
	ctx := context.Background()

	for _, order := range orders {
		created_at := time.Now()
		_, err := db.Exec(ctx, `INSERT INTO orders(price , description , title , created_at , phone , email , category , image_url , payment , adress) VALUES ($1 , $2 , $3 , $4 , $5 , $6 , $7 , $8 , $9 , $10)`,
			order.Price, order.Description, order.Title, created_at, order.Phone, order.Email, order.Category, order.Image_url, order.Payment, order.Adress)
		if err != nil {
			return err
		}
	}

	return nil
}

func Delete_order(id int) error {
	db := databases.DB
	ctx := context.Background()

	_, err := db.Exec(ctx, `DELETE FROM orders WHERE id = $1`, id)
	if err != nil {
		return err
	}

	return nil
}

func Update_order(order models.Manipulate_order) error {
	db := databases.DB
	ctx := context.Background()

	created_at := time.Now()
	_, err := db.Exec(ctx, `UPDATE orders SET price = $1 , description = $2 , title = $3 , created_at = $4 , phone = $5 , email = $6 , category = $7 , image_url = $8 , payment = $9 , adress = $10`,
		order.Price, order.Description, order.Title, created_at, order.Phone, order.Email, order.Category, order.Image_url, order.Payment, order.Adress)
	if err != nil {
		return err
	}

	return nil
}

func View_orders_by_user_email(email string) ([]models.Ready_order, error) {
	db := databases.DB
	ctx := context.Background()

	var orders []models.Ready_order
	result, err := db.Query(ctx, `SELECT * FROM orders WHERE email = $1`, email)
	if err != nil {
		return nil, err
	}

	for result.Next() {
		var order models.Ready_order
		err = result.Scan(&order.Id, &order.Price, &order.Description, &order.Title, &order.Created_at, &order.Phone, &order.Email, &order.Category, &order.Image_url, &order.Payment, &order.Adress)
		if err != nil {
			return nil, err
		}

		orders = append(orders, order)
	}

	return orders, nil

}

func View_category(category string) ([]models.Ready_order, error) {
	db := databases.DB
	ctx := context.Background()

	var orders []models.Ready_order
	result, err := db.Query(ctx, `SELECT * FROM orders WHERE category = $1`, category)
	if err != nil {
		return nil, err
	}

	for result.Next() {
		var order models.Ready_order
		err = result.Scan(&order.Id, &order.Price, &order.Description, &order.Title, &order.Created_at, &order.Phone, &order.Email, &order.Category, &order.Image_url, &order.Payment, &order.Adress)
		if err != nil {
			return nil, err
		}

		orders = append(orders, order)
	}

	sort.Slice(orders, func(i, j int) bool {
		return orders[i].Payment > orders[j].Payment
	})

	return orders, nil
}
