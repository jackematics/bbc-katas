package arrow_key_handler

import (
	"net/http"
	"text/template"

	"github.com/jackematics/2048/lib/page_operations"
	grid_repository "github.com/jackematics/2048/repository"
)

func ArrowKeyUpHandler(writer http.ResponseWriter, req *http.Request) {
	grid := grid_repository.Grid

	for col := range grid[0] {
		tile_count := 0
		for row := range grid {
			if grid[row][col] != 0 {
				tile_count++
			}
		}

		if tile_count == 0 {
			continue
		}

		for grid[0][col] == 0 {
			for row := 1; row < len(grid); row++ {
				if grid[row][col] == 0 {
					continue
				}

				if grid[row-1][col] == 0 {
					grid[row-1][col] = grid[row][col]
					grid[row][col] = 0
				}
			}
		}
	}

	grid_repository.Grid = grid

	page_state := page_operations.InitPageState(grid_repository.Grid)

	tmpl := template.Must(template.ParseFiles("template/grid.html"))
	tmpl.ExecuteTemplate(writer, "grid", page_state)
}
