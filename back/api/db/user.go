package db

import (
	"errors"

	"github.com/eli-rich/gobin/api/models"
	"github.com/google/uuid"
	"gorm.io/gorm"
)

func CheckUserExists(uuid string) bool {
	var Exists models.User
	result := Data.First(&Exists, "uuid = ?", uuid)
	return !errors.Is(result.Error, gorm.ErrRecordNotFound)
}

func GetUserByUUID(uuid string) models.User {
	user := models.User{}
	result := Data.First(&user, "uuid = ?", uuid)
	if errors.Is(result.Error, gorm.ErrRecordNotFound) {
		return models.User{}
	}
	return user
}

func CreateUserFromGithubToken(token string) {
	unique := uuid.NewString()
	Data.Create(&models.User{UUID: unique, Token: token, Auth: "github"})
}
