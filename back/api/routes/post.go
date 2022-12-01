package routes

import (
	"log"
	"net/http"
	"time"

	"github.com/eli-rich/wrbin/api/db"
	"github.com/eli-rich/wrbin/api/models"
	"github.com/eli-rich/wrbin/api/util"
	"github.com/gin-contrib/sessions"
	"github.com/gin-gonic/gin"
)

func GetPost(c *gin.Context) {
	post := POST_CACHE[c.Query("slug")]
	if post.Slug == "" {
		post = db.GetPostBySlug(c.Query("slug"))
	}
	if post.Slug == "not found" {
		c.JSON(http.StatusNotFound, gin.H{
			"content": "ERROR: Post not found.",
			"title":   "ERROR",
			"lang":    "",
		})
		return
	}
	c.JSON(http.StatusOK, gin.H{
		"content": post.Content,
		"title":   post.Title,
		"lang":    post.Lang,
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

var limiter = make(map[string]bool)

func CreatePost(c *gin.Context) {
	_, ok := limiter[c.ClientIP()]
	if ok {
		log.Println("[WARN] Rate limit exceeded for", c.ClientIP())
		c.JSON(http.StatusTooManyRequests, gin.H{
			"error": "ERROR: Too many requests.",
		})
		return
	}
	var body models.Post
	if err := c.ShouldBindJSON(&body); err != nil {
		c.JSON(http.StatusUnprocessableEntity, gin.H{
			"error": "Invalid request body",
		})
		return
	}
	if len(body.Content) > 1000000 {
		c.JSON(http.StatusUnprocessableEntity, gin.H{
			"error": "Content too long",
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
		err = db.CreatePost(body.Content, "", body.Slug, body.Title)
		limiter[c.ClientIP()] = true
		go removeLimit(c.ClientIP())
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
	err = db.CreatePost(body.Content, "", body.Slug, body.Title)
	limiter[c.ClientIP()] = true
	go removeLimit(c.ClientIP())
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

func removeLimit(ip string) {
	time.Sleep(10 * time.Second)
	delete(limiter, ip)
}
