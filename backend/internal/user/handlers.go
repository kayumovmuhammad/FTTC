package user

import (
	"encoding/json"
	"fmt"
	"from-trash-to-cash/models"
	"net/http"

	"github.com/labstack/echo/v4"
)

func Create_order_handler(c echo.Context) error {
	w := c.Response()
	r := *c.Request()

	var request models.Order
	err := json.NewDecoder(r.Body).Decode(&request)
	if err != nil {
		http.Error(w, "Неправильный json", http.StatusBadRequest)
		return nil
	}

	err = Create_order(request)
	if err != nil {
		http.Error(w, "Ошибка сервера", http.StatusInternalServerError)
		fmt.Println(err)
		return nil
	}

	return nil
}

func Delete_order_handler(c echo.Context) error {
	w := c.Response()
	r := *c.Request()

	var request models.Index
	err := json.NewDecoder(r.Body).Decode(&request)
	if err != nil {
		http.Error(w, "Неправильный json", http.StatusBadRequest)
		return nil
	}

	err = Delete_order(request.Id)
	if err != nil {
		http.Error(w, "Ошибка сервера", http.StatusInternalServerError)
		return nil
	}

	return nil
}

func Update_order_handler(c echo.Context) error {
	w := c.Response()
	r := *c.Request()

	var request models.Manipulate_order
	err := json.NewDecoder(r.Body).Decode(&request)
	if err != nil {
		http.Error(w, "Неправильный json", http.StatusBadRequest)
		return nil
	}

	err = Update_order(request)
	if err != nil {
		http.Error(w, "Ошибка сервера", http.StatusInternalServerError)
		return nil
	}

	return nil
}

func View_orders_by_user_id_handler(c echo.Context) error {
	w := c.Response()
	r := *c.Request()

	var request models.Sign_out_request
	err := json.NewDecoder(r.Body).Decode(&request)
	if err != nil {
		http.Error(w, "Неправильный json", http.StatusBadRequest)
		return nil
	}

	response, err := View_orders_by_user_email(request.Mail)
	if err != nil {
		fmt.Println(err)
		http.Error(w, "Ошибка сервера", http.StatusInternalServerError)
		return nil
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(response)
	return nil

}

func View_category_handler(c echo.Context) error {
	w := c.Response()
	r := *c.Request()

	var request models.Watch_category
	err := json.NewDecoder(r.Body).Decode(&request)
	if err != nil {
		http.Error(w, "Неправильный json", http.StatusBadRequest)
		return nil
	}

	response, err := View_category(request.Category)
	if err != nil {
		http.Error(w, "Ошибка сервера", http.StatusInternalServerError)
		return nil
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(response)
	return nil
}

func Create_more_orders_handler(c echo.Context) error {
	w := c.Response()
	r := *c.Request()

	var request []models.Order
	err := json.NewDecoder(r.Body).Decode(&request)
	if err != nil {
		http.Error(w, "Неправильный json", http.StatusBadRequest)
		return nil
	}

	err = Create_more_orders(request)
	if err != nil {
		http.Error(w, "Ошибка сервера", http.StatusInternalServerError)
		fmt.Println(err)
		return nil
	}

	return nil
}
