package routes

import (
	"github.com/eli-rich/wrbin/api/auth"
	"github.com/gin-gonic/gin"
)

func LoadRoutes(r *gin.Engine) {
	r.GET("/api/post", GetPost)
	r.GET("/:slug/raw", GetRaw)
	r.POST("/api/post", CreatePost)

	r.GET("/auth/github", auth.InitalizeGithub)
	r.GET("/auth/github/callback", auth.AuthorizeGithub)

	r.GET("/api/me", Me)
}
