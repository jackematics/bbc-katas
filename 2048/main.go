package main

import (
	"html/template"
	"log"
	"net/http"

	arrow_key_handler "github.com/jackematics/2048/handler"
	page_operations "github.com/jackematics/2048/lib/page_operations"
	grid_repository "github.com/jackematics/2048/repository"
)

func main() {
	page_state := page_operations.InitPageState(grid_repository.Grid)
	tmpl, err := template.ParseFiles(
		"template/index.html",
		"template/grid.html",
	)

	http.Handle("/static/", http.StripPrefix("/static/", http.FileServer(http.Dir("static"))))

	if err != nil {
		log.Fatalf("could not init templates: %+v", err)
	}

	http.HandleFunc("/", func(writer http.ResponseWriter, req *http.Request) {
		tmpl.ExecuteTemplate(writer, "index.html", page_state)
	})

	http.HandleFunc("/arrow-key-up", arrow_key_handler.ArrowKeyUpHandler)

	log.Println("Server started on :8000")
	http.ListenAndServe(":8000", nil)
}
