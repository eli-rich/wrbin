package main

import (
	"net/http"

	"github.com/eli-rich/gobin/api/db"
	"github.com/eli-rich/gobin/api/routes"
	"github.com/gin-gonic/gin"
)

func main() {
	db.Initalize()
	r := gin.Default()
	routes.LoadRoutes(r)
	r.NoRoute(gin.WrapH(http.FileServer(http.Dir("./front/dist"))))
	r.GET("/:slug", func(c *gin.Context) {
		c.File("./front/dist/index.html")
	})
	r.Run(":3000")
}