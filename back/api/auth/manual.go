package auth

import (
	"errors"
	"net/http"

	"github.com/eli-rich/wrbin/api/db"
	"github.com/gin-contrib/sessions"
	"github.com/gin-gonic/gin"
	"golang.org/x/crypto/bcrypt"
)

func RegisterUser(c *gin.Context) {
	email := c.PostForm("email")
	password := c.PostForm("password")

	if email == "" || password == "" {
		c.JSON(http.StatusUnprocessableEntity, gin.H{"error": "Missing email or password"})
		return
	}

	user := db.GetUserByEmail(email)
	if user.Email != "" {
		c.JSON(http.StatusConflict, gin.H{"error": "User already exists"})
		return
	}

	hash, err := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Internal Server Error"})
		return
	}

	user = db.CreateUser(email, string(hash), "manual")
	sesh := sessions.Default(c)
	sesh.Delete("user")
	sesh.Set("user", user.UUID)
	sesh.Save()
	c.JSON(http.StatusOK, gin.H{"success": "User created"})
}

func LoginUser(c *gin.Context) {
	email := c.PostForm("email")
	password := c.PostForm("password")

	if email == "" || password == "" {
		c.JSON(http.StatusUnprocessableEntity, gin.H{"error": "Missing email or password"})
		return
	}

	user := db.GetUserByEmail(email)
	if user.Email == "" {
		c.JSON(http.StatusNotFound, gin.H{"error": "User not found"})
		return
	}
	err := bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(password))
	if errors.Is(err, bcrypt.ErrMismatchedHashAndPassword) {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Incorrect password"})
		return
	}
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Internal Server Error"})
		return
	}
	sesh := sessions.Default(c)
	sesh.Delete("user")
	sesh.Set("user", user.UUID)
	sesh.Save()
	c.JSON(http.StatusOK, gin.H{"success": "Logged in"})
}
