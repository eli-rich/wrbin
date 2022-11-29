package models

import "gorm.io/gorm"

type Post struct {
	gorm.Model
	Content string
	Slug    string
}
