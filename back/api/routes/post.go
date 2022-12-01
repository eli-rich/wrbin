package routes

import (
	"net/http"

	"github.com/eli-rich/wrbin/api/db"
	"github.com/eli-rich/wrbin/api/models"
	"github.com/eli-rich/wrbin/api/util"
	"github.com/gin-contrib/sessions"
	"github.com/gin-gonic/gin"
)

func GetPost(c *gin.Context) {
	post := db.GetPostBySlug(c.Query("slug"))
	if post.Slug == "not found" {
		c.JSON(http.StatusNotFound, gin.H{
			"content": "Post not found",
		})
		return
	}
	c.JSON(http.StatusOK, gin.H{
		"content": post.Content,
	})
}

func CreatPost(c *gin.Context) {
	var body models.Post
	if err := c.ShouldBindJSON(&body); err != nil {
		c.JSON(http.StatusUnprocessableEntity, gin.H{
			"error": "Invalid request body",
		})
		return
	}
	body.Slug = util.GenerateSlug(6)
	for db.CheckPostExists(body.Slug) {
		body.Slug = util.GenerateSlug(6)
	}

	sesh := sessions.Default(c)
	UUID := sesh.Get("user")
	err := db.CreatePost(body.Content, UUID.(string), body.Slug)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": "Internal Server Error",
		})
		return
	}
	c.JSON(http.StatusOK, gin.H{
		"message": body.Slug,
	})
}
