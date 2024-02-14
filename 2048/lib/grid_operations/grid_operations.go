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
