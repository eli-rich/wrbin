package routes

import (
	"fmt"
	"time"

	"github.com/eli-rich/wrbin/api/db"
	"github.com/eli-rich/wrbin/api/models"
)

var POST_CACHE map[string]models.Post

func InitializeCache() {
	POST_CACHE = make(map[string]models.Post)
}

func LoadIntoCache(slug string) {
	fmt.Println("Loaded into cache:", slug)
	exists := POST_CACHE[slug]
	if exists.Slug != "" {
		return
	}
	POST_CACHE[slug] = db.GetPostBySlug(slug)
	go RemoveFromCache(slug)
}

func RemoveFromCache(slug string) {
	time.Sleep(60 * time.Second)
	fmt.Println("Removing from cache:", slug)
	delete(POST_CACHE, slug)
}
