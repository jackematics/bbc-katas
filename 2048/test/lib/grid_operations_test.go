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
