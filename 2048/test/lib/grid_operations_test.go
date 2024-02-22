package lib_test

import (
	"testing"

	"github.com/jackematics/2048/lib/grid_operations"
	"github.com/stretchr/testify/assert"
)

func TestInitGrid(t *testing.T) {
	grid := grid_operations.InitGrid()

	zeroCount := 0
	twoCount := 0

	for row := range grid {
		for col := range grid[0] {
			if grid[row][col] == 0 {
				zeroCount++
			}

			if grid[row][col] == 2 {
				twoCount++
			}
		}
	}

	assert.Equal(t, 14, zeroCount)
	assert.Equal(t, 2, twoCount)
}

func TestMoveTilesUp(t *testing.T) {
	grid := [][]int{
		{0, 0, 0, 0},
		{0, 2, 2, 0},
		{0, 0, 0, 0},
		{0, 0, 0, 0},
	}

	grid_operations.MoveTilesUp(&grid)

	assert.Equal(t, 2, grid[0][1])
	assert.Equal(t, 2, grid[0][1])
}

func TestMoveTilesRight(t *testing.T) {
	grid := [][]int{
		{0, 0, 0, 0},
		{0, 0, 2, 0},
		{0, 0, 2, 0},
		{0, 0, 0, 0},
	}

	grid_operations.MoveTilesRight(&grid)

	assert.Equal(t, 2, grid[1][3])
	assert.Equal(t, 2, grid[2][3])
}
func TestMoveTilesDown(t *testing.T) {
	grid := [][]int{
		{0, 0, 0, 0},
		{0, 2, 2, 0},
		{0, 0, 0, 0},
		{0, 0, 0, 0},
	}

	grid_operations.MoveTilesDown(&grid)

	assert.Equal(t, 2, grid[3][1])
	assert.Equal(t, 2, grid[3][2])
}
func TestMoveTilesLeft(t *testing.T) {
	grid := [][]int{
		{0, 0, 0, 0},
		{0, 2, 0, 0},
		{0, 2, 0, 0},
		{0, 0, 0, 0},
	}

	grid_operations.MoveTilesLeft(&grid)

	assert.Equal(t, 2, grid[1][0])
	assert.Equal(t, 2, grid[2][0])
}

func TestMergeTilesUp(t *testing.T) {
	grid := [][]int{
		{0, 0, 0, 0},
		{0, 2, 0, 0},
		{0, 2, 0, 0},
		{0, 0, 0, 0},
	}

	grid_operations.MoveTilesUp(&grid)

	assert.Equal(t, 4, grid[0][1])
}

func TestMergeTilesRight(t *testing.T) {
	grid := [][]int{
		{0, 0, 0, 0},
		{0, 2, 2, 0},
		{0, 0, 0, 0},
		{0, 0, 0, 0},
	}

	grid_operations.MoveTilesRight(&grid)

	assert.Equal(t, 4, grid[1][3])
}
func TestMergeTilesDown(t *testing.T) {
	grid := [][]int{
		{0, 0, 0, 0},
		{0, 2, 0, 0},
		{0, 2, 0, 0},
		{0, 0, 0, 0},
	}

	grid_operations.MoveTilesDown(&grid)

	assert.Equal(t, 4, grid[3][1])
}
func TestMergeTilesLeft(t *testing.T) {
	grid := [][]int{
		{0, 0, 0, 0},
		{0, 2, 2, 0},
		{0, 0, 0, 0},
		{0, 0, 0, 0},
	}

	grid_operations.MoveTilesLeft(&grid)

	assert.Equal(t, 4, grid[1][0])
}

func TestTileGeneratedOnMove(t *testing.T) {
	grid := [][]int{
		{0, 0, 0, 0},
		{0, 2, 2, 0},
		{0, 0, 0, 0},
		{0, 0, 0, 0},
	}

	grid_operations.MoveTilesUp(&grid)

	tileCount := 0
	for row := range grid {
		for col := range grid[0] {
			if grid[row][col] > 0 {
				tileCount++
			}
		}
	}

	assert.Equal(t, 3, tileCount)
}
