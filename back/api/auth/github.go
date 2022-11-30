package auth

import (
	"fmt"
	"log"
	"os"

	"github.com/eli-rich/gobin/api/db"
	"github.com/eli-rich/gobin/api/models"
	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
	"github.com/monaco-io/request"
)

var githubClientID string = os.Getenv("GITHUB_CLIENT")
var githubSecret string = os.Getenv("GITHUB_SECRET")
var redirect string = os.Getenv("GITHUB_REDIRECT")
var finalCallback string = os.Getenv("FINAL_CALLBACK")

func InitalizeGithub(c *gin.Context) {
	state := uuid.NewString()
	db.Data.Create(&models.User{UUID: state})
	c.Redirect(302, "https://github.com/login/oauth/authorize?client_id="+githubClientID+"&redirect_uri="+redirect+"&state="+state)
}

func GithubCallback(c *gin.Context) {
	code := c.Query("code")
	state := c.Query("state")
	user := db.GetUserByUUID(state)
	if user.UUID == "" {
		c.Redirect(302, "/")
		return
	}
	var result interface{}
	client := request.Client{
		URL:    "https://github.com/login/oauth/access_token",
		Method: "POST",
		Query:  map[string]string{"client_id": githubClientID, "client_secret": githubSecret, "code": code, "redirect_uri": finalCallback, "state": state},
	}
	resp := client.Send().Scan(&result)
	if !resp.OK() {
		log.Println(resp.Error())
		c.JSON(500, gin.H{"error": "Failed to get access token from github."})
	}
	fmt.Println(result)
	fmt.Println(resp.String())
	c.Redirect(302, "/")
}
