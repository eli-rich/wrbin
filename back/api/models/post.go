package models

import "gorm.io/gorm"

type Post struct {
	gorm.Model
	Content  string
	AuthorID string
	Title    string
	Slug     string `gorm:"uniqueIndex"`
}
