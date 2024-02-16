package arrow_key_handler

import (
	"io"
	"net/http"
	"strings"
	"text/template"

	"github.com/jackematics/2048/lib/grid_operations"
	"github.com/jackematics/2048/lib/page_operations"
	grid_repository "github.com/jackematics/2048/repository"
)

func ArrowKeyEventHandler(writer http.ResponseWriter, req *http.Request) {
	body, err := io.ReadAll(req.Body)

	// write test
	if err != nil {
		http.Error(writer, "Error reading request body", http.StatusBadRequest)
	}
	defer req.Body.Close()

	arrow_key := strings.TrimPrefix(string(body), "arrow_key=")

	switch arrow_key {
	case "ArrowUp":
		grid_operations.MoveTilesUp(&grid_repository.Grid)
	case "ArrowRight":
		grid_operations.MoveTilesRight(&grid_repository.Grid)
	case "ArrowDown":
		grid_operations.MoveTilesDown(&grid_repository.Grid)
	case "ArrowLeft":
		grid_operations.MoveTilesLeft(&grid_repository.Grid)
	default:
		// write a test
		http.Error(writer, "Invalid key", http.StatusBadRequest)
	}

	page_state := page_operations.CreateGridPageState(grid_repository.Grid)

	tmpl := template.Must(template.ParseFiles("template/grid.html"))
	tmpl.ExecuteTemplate(writer, "grid", page_state)
}
