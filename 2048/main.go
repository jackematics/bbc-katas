package main

import (
	"html/template"
	"net/http"

	grid_repository "github.com/jackematics/2048/repository"
)

func main() {
	fs := http.FileServer(http.Dir("static"))

	http.HandleFunc("/", func(writer http.ResponseWriter, req *http.Request) {
		tmpl := template.Must(template.ParseFiles("static/index.html"))
		tmpl.Execute(writer, grid_repository.Grid)
	})

	http.Handle("/static/", http.StripPrefix("/static/", fs))

	http.ListenAndServe(":8000", nil)
}
