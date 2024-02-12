package test

import (
	"testing"

	grid_handler "github.com/jackematics/2048/handler/grid_handler"
	"github.com/stretchr/testify/assert"
)

func TestInitGrid(t *testing.T) {
	grid := grid_handler.InitGrid()

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
