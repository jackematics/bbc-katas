package grid_operations

import "math/rand"

type GridIndex struct {
	Row int
	Col int
}

type Range struct {
	Start int
	End   int
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
	rowRange := Range{1, len(*grid)}
	colRange := Range{0, len((*grid)[0])}
	swapDelta := GridIndex{-1, 0}

	tile_move_count := moveTiles(grid, rowRange, colRange, swapDelta)

	for row := rowRange.Start; row < rowRange.End; row++ {
		for col := colRange.Start; col < colRange.End; col++ {
			if (*grid)[row+swapDelta.Row][col+swapDelta.Col] == (*grid)[row][col] {
				(*grid)[row+swapDelta.Row][col+swapDelta.Col] = 2 * (*grid)[row][col]
				(*grid)[row][col] = 0
				tile_move_count++
			}
		}
	}

	tile_move_count += moveTiles(grid, rowRange, colRange, swapDelta)

	if tile_move_count > 0 {
		generateTileInGrid(grid)
	}
}

func MoveTilesRight(grid *[][]int) {
	rowRange := Range{0, len(*grid)}
	colRange := Range{0, len((*grid)[0]) - 1}
	swapDelta := GridIndex{0, +1}

	tile_move_count := moveTiles(grid, rowRange, colRange, swapDelta)

	for row := rowRange.Start; row < rowRange.End; row++ {
		for col := colRange.End - 1; col >= colRange.Start; col-- {
			if (*grid)[row+swapDelta.Row][col+swapDelta.Col] == (*grid)[row][col] {
				(*grid)[row+swapDelta.Row][col+swapDelta.Col] = 2 * (*grid)[row][col]
				(*grid)[row][col] = 0
				tile_move_count++
			}
		}
	}

	tile_move_count += moveTiles(grid, rowRange, colRange, swapDelta)

	if tile_move_count > 0 {
		generateTileInGrid(grid)
	}
}

func MoveTilesDown(grid *[][]int) {
	rowRange := Range{0, len(*grid) - 1}
	colRange := Range{0, len((*grid)[0])}
	swapDelta := GridIndex{+1, 0}

	tile_move_count := moveTiles(grid, rowRange, colRange, swapDelta)

	for row := rowRange.End - 1; row >= rowRange.Start; row-- {
		for col := colRange.Start; col < colRange.End; col++ {
			if (*grid)[row+swapDelta.Row][col+swapDelta.Col] == (*grid)[row][col] {
				(*grid)[row+swapDelta.Row][col+swapDelta.Col] = 2 * (*grid)[row][col]
				(*grid)[row][col] = 0
				tile_move_count++
			}
		}
	}
	tile_move_count += moveTiles(grid, rowRange, colRange, swapDelta)

	if tile_move_count > 0 {
		generateTileInGrid(grid)
	}
}

func MoveTilesLeft(grid *[][]int) {
	rowRange := Range{0, len(*grid)}
	colRange := Range{1, len((*grid)[0])}
	swapDelta := GridIndex{0, -1}

	tile_move_count := moveTiles(grid, rowRange, colRange, swapDelta)

	for row := rowRange.Start; row < rowRange.End; row++ {
		for col := colRange.Start; col < colRange.End; col++ {
			if (*grid)[row+swapDelta.Row][col+swapDelta.Col] == (*grid)[row][col] {
				(*grid)[row+swapDelta.Row][col+swapDelta.Col] = 2 * (*grid)[row][col]
				(*grid)[row][col] = 0
				tile_move_count++
			}
		}
	}
	tile_move_count += moveTiles(grid, rowRange, colRange, swapDelta)

	if tile_move_count > 0 {
		generateTileInGrid(grid)
	}
}

func moveTiles(grid *[][]int, rowRange Range, colRange Range, swapDelta GridIndex) int {
	tile_move_count := 0
	tiles_still_moving := true

	for tiles_still_moving {
		tiles_still_moving = false

		for row := rowRange.Start; row < rowRange.End; row++ {
			for col := colRange.Start; col < colRange.End; col++ {
				if (*grid)[row][col] > 0 {
					if (*grid)[row+swapDelta.Row][col+swapDelta.Col] == 0 {
						(*grid)[row+swapDelta.Row][col+swapDelta.Col] = (*grid)[row][col]
						(*grid)[row][col] = 0
						tiles_still_moving = true
						tile_move_count++
					}

				}
			}
		}
	}

	return tile_move_count
}
