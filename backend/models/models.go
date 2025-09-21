package models

import "time"

type Sign_up_request struct {
	Mail     string `json:"mail"`
	Login    string `json:"login"`
	Password string `json:"password"`
}

type Confirm_email_request struct {
	Mail     string `json:"mail"`
	Password string `json:"password"`
}

type User struct {
	Email    string `json:"email"`
	Password string `json:"password"`
	Login    string `json:"login"`
}

type Temp_user struct {
	Id             int       `json:"int"`
	Email          string    `json:"email"`
	Email_password string    `json:"email_password"`
	Login          string    `json:"login"`
	Temp_code      string    `json:"temp_code"`
	Finish_time    time.Time `json:"finish_time"`
}

type Sign_out_request struct {
	Mail string `json:"mail"`
}

type Order struct {
	Price       int      `json:"price"`
	Description string   `json:"description"`
	Title       string   `json:"title"`
	Phone       string   `json:"phone"`
	Email       string   `json:"email"`
	Category    string   `json:"category"`
	Image_url   []string `json:"image_url"`
	Payment     int      `json:"payment"`
	Adress      string   `json:"adress"`
}

type Manipulate_order struct {
	Id int `json:"id"`
	Order
}

type Ready_order struct {
	Manipulate_order
	Created_at time.Time
}

type Index struct {
	Id int `json:"id"`
}

type Watch_category struct {
	Category string `json:"category"`
}
