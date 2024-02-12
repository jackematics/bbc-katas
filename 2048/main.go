package main

import (
	"fmt"
	"html/template"
	"net/http"

	page_handler "github.com/jackematics/2048/handler/page_handler"
	grid_repository "github.com/jackematics/2048/repository"
)

func main() {
	fs := http.FileServer(http.Dir("static"))

	page_state := page_handler.InitPageState(grid_repository.Grid)

	http.HandleFunc("/", func(writer http.ResponseWriter, req *http.Request) {
		tmpl := template.Must(template.ParseFiles("static/index.html"))
		tmpl.Execute(writer, page_state)
	})

	http.Handle("/static/", http.StripPrefix("/static/", fs))

	fmt.Println("Server started on :8000")
	http.ListenAndServe(":8000", nil)
}
