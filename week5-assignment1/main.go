package main

import (
	"fmt"
	"net/http"

	"github.com/gin-gonic/gin"
)

type Book struct {
	ID_book string  `json:"id"`
	Name    string  `json:"name"`
	Author  string  `json:"Author"`
	Price   float64 `json:"price"`
}

var books = []Book{
	{ID_book: "01", Name: "Hirano to Kagiura", Author: "Shō Harusono", Price: 169.00},
	{ID_book: "02", Name: "Kimetsu no Yaiba", Author: "Koyoharu Gotouge", Price: 66.50},
	{ID_book: "03", Name: "Sasaki to Miyano", Author: "Shō Harusono", Price: 185.00},
	{ID_book: "04", Name: "One Piece", Author: "Oda Eiichirō", Price: 85.00},
	{ID_book: "05", Name: "Jujutsu Kaisen", Author: "Gege Akutami", Price: 80.00},
}

func getBook(c *gin.Context) {
	ID_filled := c.Query("id")
	if ID_filled != "" {
		var filter1 []Book
		for _, book := range books {
			if fmt.Sprint(book.ID_book) == ID_filled {
				filter1 = append(filter1, book)
			}
		}
		c.JSON(http.StatusOK, filter1)
		return
	}
	//return
	c.JSON(http.StatusOK, books)
}

type Music struct {
	ID_music string `json:"id"`
	Name     string `json:"name"`
	Singer   string `json:"singer"`
}

var musics = []Music{
	{ID_music: "01", Name: "How It's Done", Singer: "HUNTR/X"},
	{ID_music: "02", Name: "三原色 (Sangenshoku)", Singer: "YOASOBI"},
	{ID_music: "03", Name: "소용돌이(To you)", Singer: "SEVENTEEN"},
	{ID_music: "04", Name: "Golden", Singer: "HUNTR/X"},
	{ID_music: "05", Name: "Young And Beautiful", Singer: "Lana Del Rey"},
}

func getMusic(c *gin.Context) {
	ID_filled := c.Query("id")
	if ID_filled != "" {
		var filter2 []Music
		for _, music := range musics {
			if fmt.Sprint(music.ID_music) == ID_filled {
				filter2 = append(filter2, music)
			}
		}
		c.JSON(http.StatusOK, filter2)
		return
	}
	//return
	c.JSON(http.StatusOK, musics)
}

func main() {
	r := gin.Default()
	r.GET("/Heathly", func(c *gin.Context) {
		c.JSON(200, gin.H{"message": "Healthy"})
	})

	api := r.Group("/api/v1")
	{
		api.GET("/book", getBook)
		api.GET("/music", getMusic)
	}

	r.Run(":8080")
}
