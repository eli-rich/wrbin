package db

import (
	"log"

	"github.com/eli-rich/gobin/api/models"
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

var Post *gorm.DB

func Initalize() {
	var err error
	Post, err = gorm.Open(sqlite.Open("test.sqlite"), &gorm.Config{})
	if err != nil {
		log.Fatalln(err)
	}
	Post.AutoMigrate(&models.Post{})
}
