package routes

import "github.com/gin-gonic/gin"

func LoadRoutes(r *gin.Engine) {
	r.GET("/api/post", GetPost)
	r.POST("/api/post", CreatPost)
}
