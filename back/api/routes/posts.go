package routes

import (
	"github.com/eli-rich/wrbin/api/db"
	"github.com/gin-contrib/sessions"
	"github.com/gin-gonic/gin"
)

func PostsRoute(c *gin.Context) {
	c.File("./front/dist/index.html")
}

func CollectPosts(c *gin.Context) {
	sesh := sessions.Default(c)
	author := sesh.Get("user")
	if author == nil {
		c.JSON(401, gin.H{"error": "not logged in"})
		return
	}
	posts := db.GetCollectionByAuthor(author.(string))
	if len(posts) < 1 {
		c.JSON(404, gin.H{"message": "no posts found"})
		return
	}
	c.JSON(200, posts)
}
