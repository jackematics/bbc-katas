package arrow_key_handler

import (
	"net/http"
	"text/template"

	"github.com/jackematics/2048/lib/page_operations"
	grid_repository "github.com/jackematics/2048/repository"
)

func ArrowKeyUpHandler(writer http.ResponseWriter, req *http.Request) {
	grid := grid_repository.Grid

	tiles_still_moving := true
	for tiles_still_moving {
		tiles_still_moving = false

		for row := 1; row < len(grid); row++ {
			for col := range grid[0] {
				if grid[row][col] > 0 {
					if grid[row-1][col] == 0 {
						grid[row-1][col] = grid[row][col]
						grid[row][col] = 0
						tiles_still_moving = true
					}
				}
			}
		}
	}

	grid_repository.Grid = grid
	page_state := page_operations.CreateGridPageState(grid_repository.Grid)

	tmpl := template.Must(template.ParseFiles("template/grid.html"))
	tmpl.ExecuteTemplate(writer, "grid", page_state)
}
