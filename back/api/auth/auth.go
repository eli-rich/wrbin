package auth

import (
	"os"

	"github.com/gin-contrib/sessions"
	"github.com/gin-contrib/sessions/cookie"
	"github.com/gin-gonic/gin"
)

var secret = []byte(os.Getenv("SESH_SECRET"))
var Store = cookie.NewStore(secret)

func InitSessionMiddleware(r *gin.Engine) {
	r.Use(sessions.Sessions("wrbin_sesh", Store))
}
