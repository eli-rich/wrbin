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
			"content": "ERROR: Post not found.",
		})
		return
	}
	c.JSON(http.StatusOK, gin.H{
		"content": post.Content,
	})
}

func GetRaw(c *gin.Context) {
	post := db.GetPostBySlug(c.Param("slug"))
	if post.Slug == "not found" {
		c.String(http.StatusNotFound, "ERROR: Post not found.")
		return
	}
	c.String(http.StatusOK, post.Content)
}

func CreatePost(c *gin.Context) {
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
	var err error
	if UUID == nil {
		err = db.CreatePost(body.Content, "", body.Slug)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{
				"error": "Internal Server Error",
			})
			return
		}
		c.JSON(http.StatusOK, gin.H{
			"message": body.Slug,
		})
		return
	}
	err = db.CreatePost(body.Content, "", body.Slug)
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
