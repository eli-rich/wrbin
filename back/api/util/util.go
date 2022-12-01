package util

import (
	"math/rand"
	"time"
)

const letters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"

func SeedRandom() {
	rand.Seed(time.Now().UnixNano())
}

func GenerateSlug(length int) string {
	var slug string
	for i := 0; i < length; i++ {
		slug += string(letters[rand.Intn(len(letters))])
	}
	return slug
}
