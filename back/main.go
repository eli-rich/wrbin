package main

import (
	"log"
	"net/http"

	"github.com/eli-rich/gobin/api/auth"
	"github.com/eli-rich/gobin/api/db"
	"github.com/eli-rich/gobin/api/routes"
	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
	"github.com/nanmu42/gzip"
)

func main() {
	err := godotenv.Load()
	if err != nil {
		log.Fatalln(err)
	}
	db.Initalize()
	gin.SetMode(gin.ReleaseMode)
	r := gin.Default()
	r.Use(gzip.DefaultHandler().Gin)
	auth.InitSessionMiddleware(r)
	routes.LoadRoutes(r)
	r.NoRoute(gin.WrapH(http.FileServer(http.Dir("./front/dist"))))
	r.GET("/:slug", func(c *gin.Context) {
		c.File("./front/dist/index.html")
	})
	r.Run(":3000")
}
