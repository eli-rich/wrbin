package models

import "gorm.io/gorm"

type User struct {
	gorm.Model
	Username string `gorm:"unique"`
	Password string
	Token    string `gorm:"unique"`
	UUID     string `gorm:"unique"`
	Posts    []Post `gorm:"foreignKey:AuthorID"`
}
