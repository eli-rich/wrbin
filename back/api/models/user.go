package models

import "gorm.io/gorm"

const (
	// auth types
	Github = "github"
	Manual = "manual"
)

type User struct {
	gorm.Model
	Email    string `gorm:"unique"`
	Password string
	UUID     string `gorm:"uniqueIndex"`
	Auth     string
	Posts    []Post `gorm:"foreignKey:AuthorID"`
}
