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

func TestUpArrowKey(t *testing.T) {
	req, err := http.NewRequest("GET", "/arrow-key-event?key=ArrowUp", nil)

	assert.Equal(t, nil, err)

	rr := httptest.NewRecorder()

	arrow_key_handler.ArrowKeyEventHandler(rr, req)

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

func TestRightArrowKey(t *testing.T) {
	req, err := http.NewRequest("GET", "/arrow-key-event?key=ArrowRight", nil)

	assert.Equal(t, nil, err)

	rr := httptest.NewRecorder()

	arrow_key_handler.ArrowKeyEventHandler(rr, req)

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
