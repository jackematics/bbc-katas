package lib_test

import (
	"testing"

	"github.com/google/go-cmp/cmp"
	"github.com/jackematics/2048/lib/page_operations"
	"github.com/stretchr/testify/assert"
)

func TestInitPageState(t *testing.T) {
	grid := [][]int{{0, 2, 4}, {8, 16, 32}, {64, 128, 256}, {512, 1024, 2048}}

	page_state := page_operations.InitPageState(grid)
	expected := [][]page_operations.TileData{
		{
			{Value: 0, BgColour: "bg-container-dark-blue", FontSize: "text-6xl"},
			{Value: 2, BgColour: "bg-tile-2-colour", FontSize: "text-6xl"},
			{Value: 4, BgColour: "bg-tile-4-colour", FontSize: "text-6xl"},
		},
		{
			{Value: 8, BgColour: "bg-tile-8-colour", FontSize: "text-6xl"},
			{Value: 16, BgColour: "bg-tile-16-colour", FontSize: "text-5xl"},
			{Value: 32, BgColour: "bg-tile-32-colour", FontSize: "text-5xl"},
		},
		{
			{Value: 64, BgColour: "bg-tile-64-colour", FontSize: "text-5xl"},
			{Value: 128, BgColour: "bg-tile-128-colour", FontSize: "text-5xl"},
			{Value: 256, BgColour: "bg-tile-256-colour", FontSize: "text-5xl"},
		},
		{
			{Value: 512, BgColour: "bg-tile-512-colour", FontSize: "text-5xl"},
			{Value: 1024, BgColour: "bg-tile-1024-colour", FontSize: "text-4xl"},
			{Value: 2048, BgColour: "bg-tile-2048-colour", FontSize: "text-4xl"},
		},
	}

	assert.Equal(t, true, cmp.Equal(page_state, expected))
}
