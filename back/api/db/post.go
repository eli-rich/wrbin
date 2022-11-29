package db

import (
	"errors"

	"github.com/eli-rich/gobin/api/models"
	"gorm.io/gorm"
)

func CheckExists(slug string) bool {
	var Exists models.Post
	result := Post.First(&Exists, "slug = ?", slug)
	return !errors.Is(result.Error, gorm.ErrRecordNotFound)
}
