package util

import "math/rand"

const letters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"

func GenerateSlug(length int) string {
	var slug string
	for i := 0; i < length; i++ {
		slug += string(letters[rand.Intn(len(letters))])
	}
	return slug
}
