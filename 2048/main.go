package main

import (
	"html/template"
	"log"
	"net/http"

	grid_handler "github.com/jackematics/2048/handler/grid_handler"
	page_operations "github.com/jackematics/2048/lib/page_operations"
	grid_repository "github.com/jackematics/2048/repository"
)

func main() {
	tmpl, err := template.ParseFiles(
		"template/index.html",
		"template/grid.html",
	)

	http.Handle("/static/", http.StripPrefix("/static/", http.FileServer(http.Dir("static"))))

	if err != nil {
		log.Fatalf("could not init templates: %+v", err)
	}

	http.HandleFunc("/", func(writer http.ResponseWriter, req *http.Request) {
		page_state := page_operations.CreateGridPageState(grid_repository.Grid)
		tmpl.ExecuteTemplate(writer, "index.html", page_state)
	})

	http.HandleFunc("/arrow-key-event", grid_handler.ArrowKeyEventHandler)
	http.HandleFunc("/new-game-event", grid_handler.NewGameHandler)

	log.Println("Server started on :8000")
	http.ListenAndServe(":8000", nil)
}
