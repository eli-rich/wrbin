package main

import (
	"log"
	"net/http"

	"github.com/eli-rich/wrbin/api/auth"
	"github.com/eli-rich/wrbin/api/db"
	"github.com/eli-rich/wrbin/api/routes"
	"github.com/eli-rich/wrbin/api/util"
	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
)

func main() {
	err := godotenv.Load()
	if err != nil {
		log.Fatalln(err)
	}
	db.Initalize()
	util.SeedRandom()
	gin.SetMode(gin.ReleaseMode)

	r := gin.Default()
	auth.InitSessionMiddleware(r)
	routes.LoadRoutes(r)
	r.NoRoute(gin.WrapH(http.FileServer(http.Dir("./front/dist"))))
	r.Run(":3000")
}
