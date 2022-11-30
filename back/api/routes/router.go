package routes

import (
	"github.com/gin-gonic/gin"
)

func LoadRoutes(r *gin.Engine) {
	r.GET("/api/post", GetPost)
	r.POST("/api/post", CreatPost)

	// r.GET("/auth/github", auth.InitalizeGithub)
	// r.GET("/auth/github/callback", auth.GithubCallback)
}
