package util

import "math/rand"

const letters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"

func GenerateSlug() string {
	var slug string
	for i := 0; i < 6; i++ {
		slug += string(letters[rand.Intn(len(letters))])
	}
	return slug
}
