package auth

import (
	"log"
	"os"
	"time"

	"github.com/eli-rich/wrbin/api/db"
	"github.com/eli-rich/wrbin/api/util"
	"github.com/gin-contrib/sessions"
	"github.com/gin-gonic/gin"
	"github.com/monaco-io/request"
)

var activeStates = make(map[string]chan bool)

var githubClientID string = os.Getenv("GITHUB_CLIENT")
var githubSecret string = os.Getenv("GITHUB_SECRET")
var githubRedirect string = os.Getenv("GITHUB_REDIRECT")
var rootURL string = os.Getenv("FINAL_CALLBACK")

func InitalizeGithub(c *gin.Context) {
	var state string = util.GenerateSlug(30)
	_, ok := activeStates[state]
	for ok {
		state = util.GenerateSlug(30)
		_, ok = activeStates[state]
	}
	activeStates[state] = make(chan bool)
	go RemoveState(state)
	c.Redirect(302, "https://github.com/login/oauth/authorize?client_id="+githubClientID+"&redirect_uri="+githubRedirect+"&state="+state)
}

func AuthorizeGithub(c *gin.Context) {
	state := c.Query("state")
	thread, ok := activeStates[state]
	if !ok {
		// state doesn't exist in map, or is expired.
		// something fishy is going on.
		c.Redirect(302, rootURL)
	}
	thread <- true

	code := c.Query("code")
	token := requestGithubToken(code)
	if token == "error" {
		c.JSON(500, gin.H{"error": "Internal Server Error"})
	}
	email := getGithubUserEmail(token)
	if email == "error" {
		c.JSON(500, gin.H{"error": "Internal Server Error"})
	}
	sesh := sessions.Default(c)
	user := db.CreateUser(email, "", "github")

	sesh.Delete("user")
	sesh.Set("user", user.UUID)
	sesh.Save()
	log.Println("User logged in: " + user.Email)

	c.Redirect(302, rootURL)

}

func getGithubUserEmail(token string) string {
	var result interface{}
	client := request.Client{
		URL:    "https://api.github.com/user",
		Method: "GET",
		Header: map[string]string{"Authorization": "Bearer " + token},
	}
	resp := client.Send().Scan(&result)
	if !resp.OK() {
		log.Println(resp.Error())
	}
	return result.(map[string]interface{})["email"].(string)
}

func requestGithubToken(code string) string {
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

// type GithubUser struct {
// 	Name string `json:"name"`

// func GithubProfile(token string) {

// }
