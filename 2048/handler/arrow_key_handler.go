package arrow_key_handler

import (
	"net/http"
	"text/template"

	"github.com/jackematics/2048/lib/grid_operations"
	"github.com/jackematics/2048/lib/page_operations"
	grid_repository "github.com/jackematics/2048/repository"
)

func ArrowKeyUpHandler(writer http.ResponseWriter, req *http.Request) {
	grid_operations.MoveTilesUp(&grid_repository.Grid)
	page_state := page_operations.CreateGridPageState(grid_repository.Grid)

	tmpl := template.Must(template.ParseFiles("template/grid.html"))
	tmpl.ExecuteTemplate(writer, "grid", page_state)
}

func ArrowKeyRightHandler(writer http.ResponseWriter, req *http.Request) {
	grid_operations.MoveTilesRight(&grid_repository.Grid)
	page_state := page_operations.CreateGridPageState(grid_repository.Grid)

	tmpl := template.Must(template.ParseFiles("template/grid.html"))
	tmpl.ExecuteTemplate(writer, "grid", page_state)
}
