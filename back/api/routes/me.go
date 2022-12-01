package routes

import (
	"net/http"

	"github.com/eli-rich/wrbin/api/db"
	"github.com/gin-contrib/sessions"
	"github.com/gin-gonic/gin"
)

func Me(c *gin.Context) {
	sesh := sessions.Default(c)
	UUID := sesh.Get("user")
	if UUID == nil {
		c.JSON(http.StatusOK, gin.H{
			"id": "",
		})
		return
	}
	user := db.GetUserByUUID(UUID.(string))
	c.JSON(http.StatusOK, gin.H{
		"id": user.UUID,
	})
}
