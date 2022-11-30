package routes

import (
	"errors"

	"github.com/eli-rich/gobin/api/db"
	"github.com/eli-rich/gobin/api/models"
	"github.com/eli-rich/gobin/api/util"
	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

func GetPost(c *gin.Context) {
	var post models.Post
	slug := c.Query("slug")
	result := db.Data.First(&post, "slug = ?", slug)
	if errors.Is(result.Error, gorm.ErrRecordNotFound) {
		c.JSON(404, gin.H{"error": "Post not found"})
		return
	}
	c.JSON(200, gin.H{
		"content": post.Content,
	})
}

func CreatPost(c *gin.Context) {
	var body models.Post
	if err := c.ShouldBindJSON(&body); err != nil {
		c.JSON(400, gin.H{
			"error": "Invalid request body",
		})
		return
	}
	body.Slug = util.GenerateSlug()
	for db.CheckPostExists(body.Slug) {
		body.Slug = util.GenerateSlug()
	}

	db.Data.Create(&body)
	c.JSON(200, gin.H{
		"message": body.Slug,
	})
}
