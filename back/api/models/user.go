package models

import "gorm.io/gorm"

const (
	// auth types
	Github = "github"
	Manual = "manual"
)

type User struct {
	gorm.Model
	Username string
	Password string
	Token    string `gorm:"unique"`
	UUID     string `gorm:"unique"`
	Auth     string
	Posts    []Post `gorm:"foreignKey:AuthorID"`
}
