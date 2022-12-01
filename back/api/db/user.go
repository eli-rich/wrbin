package db

import (
	"errors"

	"github.com/eli-rich/wrbin/api/models"
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

func CreateUser(email string, password string, auth string) models.User {
	exists := models.User{}
	result := Data.First(&exists, "email = ?", email)
	if !errors.Is(result.Error, gorm.ErrRecordNotFound) {
		return exists
	}
	user := models.User{
		Email:    email,
		Password: password,
		UUID:     uuid.NewString(),
		Auth:     auth,
	}
	Data.Create(&user)
	return user
}
