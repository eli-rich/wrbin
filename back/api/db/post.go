package db

import (
	"errors"

	"github.com/eli-rich/wrbin/api/models"
	"gorm.io/gorm"
)

func CheckPostExists(slug string) bool {
	var Exists models.Post
	result := Data.First(&Exists, "slug = ?", slug)
	return !errors.Is(result.Error, gorm.ErrRecordNotFound)
}

func GetPostBySlug(slug string) models.Post {
	post := models.Post{}
	result := Data.First(&post, "slug = ?", slug)
	if errors.Is(result.Error, gorm.ErrRecordNotFound) {
		return models.Post{Slug: "not found"}
	}
	return post
}

func CreatePost(content string, AuthorID string, slug string, title string) error {
	post := models.Post{Content: content, AuthorID: AuthorID, Slug: slug, Title: title}
	result := Data.Create(&post)
	if result.Error != nil {
		return result.Error
	}
	return nil
}

func GetCollectionByAuthor(authorID string) []models.Post {
	var posts []models.Post
	Data.Table("posts").Select("title", "slug", "lang", "author_id").Where("author_id = ?", authorID).Find(&posts)
	return posts
}
