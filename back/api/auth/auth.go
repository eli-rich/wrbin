package auth

import (
	"net/http"
	"os"

	"github.com/gin-contrib/sessions"
	"github.com/gin-contrib/sessions/cookie"
	"github.com/gin-gonic/gin"
	_ "github.com/joho/godotenv/autoload"
)

var secret = []byte(os.Getenv("SESH_SECRET"))
var Store = cookie.NewStore(secret)

func InitSessionMiddleware(r *gin.Engine) {
	r.Use(sessions.Sessions("wrbin_sesh", Store))
}

func SignOut(c *gin.Context) {
	sesh := sessions.Default(c)
	sesh.Clear()
	sesh.Save()
	c.Redirect(http.StatusFound, "/")
}
