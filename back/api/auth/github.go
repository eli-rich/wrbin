package auth

import (
	"log"
	"os"
	"time"

	"github.com/eli-rich/wrbin/api/db"
	"github.com/eli-rich/wrbin/api/util"
	"github.com/gin-gonic/gin"
	"github.com/monaco-io/request"
)

var activeStates = make(map[string]chan bool)

var githubClientID string = os.Getenv("GITHUB_CLIENT")
var githubSecret string = os.Getenv("GITHUB_SECRET")
var githubRedirect string = os.Getenv("GITHUB_REDIRECT")
var rootURL string = os.Getenv("FINAL_CALLBACK")

func InitalizeGithub(c *gin.Context) {
	state := util.GenerateSlug(20)
	activeStates[state] = make(chan bool)
	go RemoveState(state)
	c.Redirect(302, "https://github.com/login/oauth/authorize?client_id="+githubClientID+"&redirect_uri="+githubRedirect+"&state="+state)
}

func AuthorizeGithub(c *gin.Context) {
	state := c.Query("state")
	thread, ok := activeStates[state]
	// state doesn't exist in map, or is expired.
	// something fishy is going on.
	if !ok {
		c.Redirect(302, rootURL)
	}
	thread <- true

	code := c.Query("code")
	token := RequestGithubToken(code)
	c.Redirect(302, rootURL)
	db.CreateUserFromGithubToken(token)
}

func RequestGithubToken(code string) string {
	var result interface{}

	client := request.Client{
		URL:    "https://github.com/login/oauth/access_token",
		Method: "POST",
		Query: map[string]string{
			"client_id":     githubClientID,
			"client_secret": githubSecret,
			"code":          code,
		},
		Header: map[string]string{"Accept": "application/json"},
	}
	resp := client.Send().Scan(&result)
	if !resp.OK() {
		log.Println(resp.Error())
		return "error"
	}
	return result.(map[string]interface{})["access_token"].(string)
}

func RemoveState(state string) {
	thread := activeStates[state]
	select {
	case <-thread:
		delete(activeStates, state)
	case <-time.After(2 * time.Minute):
		delete(activeStates, state)
	}
}
