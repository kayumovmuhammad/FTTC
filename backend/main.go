package main

import (
	"fmt"
	"from-trash-to-cash/databases"
	"from-trash-to-cash/internal/auth"
	"from-trash-to-cash/internal/user"
	"time"

	"github.com/labstack/echo/v4"
	mw "github.com/labstack/echo/v4/middleware"
)

func main() {
	r := echo.New()

	databases.Init()

	r.Use(mw.Logger())
	r.Use(mw.CORSWithConfig(mw.CORSConfig{
		AllowOrigins: []string{"*"},
		AllowMethods: []string{echo.GET, echo.POST, echo.DELETE, echo.PATCH, echo.OPTIONS},
		AllowHeaders: []string{"Content-Type", "session_id"},
	}))

	fmt.Println(time.Now())

	r.POST("/auth/sign-up", auth.Sign_up_handler)
	r.POST("/auth/confirm-email", auth.Confirm_email_handler)
	r.POST("/auth/sign-in", auth.Sign_in_handler)
	r.POST("/auth/sign-out", auth.Sign_out_handler)
	r.POST("/user/create-order", user.Create_order_handler)
	r.DELETE("/user/delete-order", user.Delete_order_handler)
	r.PATCH("/user/update-order", user.Update_order_handler)
	r.POST("/user/view-order", user.View_orders_by_user_id_handler)
	r.POST("/user/view-category", user.View_category_handler)
	r.POST("/user/create-orders", user.Create_more_orders_handler)

	r.Logger.Fatal(r.Start("172.20.10.3:8080"))
}
