package auth

import (
	"fmt"
	"log"
	"os"

	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
	"github.com/monaco-io/request"
)

var githubClientID string = os.Getenv("GITHUB_CLIENT")
var githubSecret string = os.Getenv("GITHUB_SECRET")
var githubRedirect string = os.Getenv("GITHUB_REDIRECT")
var finalCallback string = os.Getenv("FINAL_CALLBACK")

func InitalizeGithub(c *gin.Context) {
	access := c.Param("access_token")
	if access != "" {
		c.Redirect(302, finalCallback)
		return
	}
	state := uuid.NewString()
	// db.Data.Create(&models.User{UUID: state})
	c.Redirect(302, "https://github.com/login/oauth/authorize?client_id="+githubClientID+"&redirect_uri="+githubRedirect+"&state="+state)
	fmt.Println("MADE IT HERE")
	fmt.Println(finalCallback)
}

func GithubCallback(c *gin.Context) {
	code := c.Query("code")
	state := c.Query("state")
	// user := db.GetUserByUUID(state)
	// if user.UUID == "" {
	// 	c.Redirect(302, "/")
	// 	return
	// }
	var result interface{}
	client := request.Client{
		URL:    "https://github.com/login/oauth/access_token",
		Method: "POST",
		Header: map[string]string{"Accept": "application/json"},
		Query:  map[string]string{"client_id": githubClientID, "client_secret": githubSecret, "code": code, "state": state},
	}
	fmt.Println("MADE IT TO FIRST CB")

	resp := client.Send().Scan(&result)
	if !resp.OK() {
		log.Println(resp.Error())
		c.JSON(500, gin.H{"error": "Failed to get access token from github."})
		return
	}
	fmt.Println("BEFORE RESULT")

	fmt.Println(result)
}
