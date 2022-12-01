package models

import "gorm.io/gorm"

type Post struct {
	gorm.Model
	Content  string
	AuthorID string
	Title    string
	Lang     string
	Slug     string `gorm:"uniqueIndex"`
}
