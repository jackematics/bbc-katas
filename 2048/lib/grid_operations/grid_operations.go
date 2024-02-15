package grid_operations

import "math/rand"

type GridIndex struct {
	Row int
	Col int
}

func findEmptySpaces(grid [][]int) []GridIndex {
	emptySpaces := []GridIndex{}

	for row := range grid {
		for col := range grid[0] {
			if grid[row][col] == 0 {
				emptySpaces = append(emptySpaces, GridIndex{Row: row, Col: col})
			}
		}
	}

	return emptySpaces
}

func generateTileInGrid(grid *[][]int) {
	emptySpaces := findEmptySpaces(*grid)

	randInArrRange := rand.Intn(len(emptySpaces))
	randIndex := emptySpaces[randInArrRange]
	(*grid)[randIndex.Row][randIndex.Col] = 2
}

func InitGrid() [][]int {
	grid := [][]int{}
	for row := 0; row < 4; row++ {
		row_arr := []int{}
		for col := 0; col < 4; col++ {
			row_arr = append(row_arr, 0)
		}
		grid = append(grid, row_arr)
	}

	generateTileInGrid(&grid)
	generateTileInGrid(&grid)

	return grid
}

func MoveTilesUp(grid *[][]int) {
	tiles_still_moving := true
	for tiles_still_moving {
		tiles_still_moving = false

		for row := 1; row < len(*grid); row++ {
			for col := range (*grid)[0] {
				if (*grid)[row][col] > 0 {
					if (*grid)[row-1][col] == 0 {
						(*grid)[row-1][col] = (*grid)[row][col]
						(*grid)[row][col] = 0
						tiles_still_moving = true
					}
				}
			}
		}
	}
}

func MoveTilesRight(grid *[][]int) {
	tiles_still_moving := true
	for tiles_still_moving {
		tiles_still_moving = false

		for row := range *grid {
			for col := 0; col < len((*grid)[0])-1; col++ {
				if (*grid)[row][col] > 0 {
					if (*grid)[row][col+1] == 0 {
						(*grid)[row][col+1] = (*grid)[row][col]
						(*grid)[row][col] = 0
						tiles_still_moving = true
					}
				}
			}
		}
	}
}
