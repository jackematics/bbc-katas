package handler_test

import (
	"net/http"
	"net/http/httptest"
	"testing"

	arrow_key_handler "github.com/jackematics/2048/handler"
	grid_repository "github.com/jackematics/2048/repository"
	_ "github.com/jackematics/2048/test"
	"github.com/stretchr/testify/assert"
)

func TestUpArrowKeyHandler(t *testing.T) {
	req, err := http.NewRequest("GET", "/arrow-key-up", nil)

	assert.Equal(t, nil, err)

	rr := httptest.NewRecorder()

	arrow_key_handler.ArrowKeyUpHandler(rr, req)

	grid := grid_repository.Grid

	for row := 1; row < len(grid); row++ {
		for col := range grid[0] {
			if grid[row][col] > 0 {
				assert.NotEqual(t, 0, grid[row-1][col])
			}
		}
	}

	assert.Equal(t, http.StatusOK, rr.Code)
}

func TestRightArrowKeyHandler(t *testing.T) {
	req, err := http.NewRequest("GET", "/arrow-key-right", nil)

	assert.Equal(t, nil, err)

	rr := httptest.NewRecorder()

	arrow_key_handler.ArrowKeyRightHandler(rr, req)

	grid := grid_repository.Grid

	for row := range grid {
		for col := 0; col < len(grid)-1; col++ {
			if grid[row][col] > 0 {
				assert.NotEqual(t, 0, grid[row][col+1])
			}
		}
	}

	assert.Equal(t, http.StatusOK, rr.Code)
}
