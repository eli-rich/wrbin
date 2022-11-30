package db

import (
	"log"

	"github.com/eli-rich/gobin/api/models"
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

var Data *gorm.DB

func Initalize() {
	var err error
	Data, err = gorm.Open(sqlite.Open("test.sqlite"), &gorm.Config{})
	if err != nil {
		log.Fatalln(err)
	}
	Data.AutoMigrate(&models.Post{})
}
