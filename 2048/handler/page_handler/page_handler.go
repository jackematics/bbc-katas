package page_handler

type TileData struct {
	Value    int
	BgColour string
	FontSize string
}

var tile_html_mappings = map[int]TileData{
	0:    {Value: 0, BgColour: "bg-container-dark-blue", FontSize: "text-6xl"},
	2:    {Value: 2, BgColour: "bg-tile-2-colour", FontSize: "text-6xl"},
	4:    {Value: 4, BgColour: "bg-tile-4-colour", FontSize: "text-6xl"},
	8:    {Value: 8, BgColour: "bg-tile-8-colour", FontSize: "text-6xl"},
	16:   {Value: 16, BgColour: "bg-tile-16-colour", FontSize: "text-5xl"},
	32:   {Value: 32, BgColour: "bg-tile-32-colour", FontSize: "text-5xl"},
	64:   {Value: 64, BgColour: "bg-tile-64-colour", FontSize: "text-5xl"},
	128:  {Value: 128, BgColour: "bg-tile-128-colour", FontSize: "text-5xl"},
	256:  {Value: 256, BgColour: "bg-tile-256-colour", FontSize: "text-5xl"},
	512:  {Value: 512, BgColour: "bg-tile-512-colour", FontSize: "text-5xl"},
	1024: {Value: 1024, BgColour: "bg-tile-1024-colour", FontSize: "text-4xl"},
	2048: {Value: 2048, BgColour: "bg-tile-2048-colour", FontSize: "text-4xl"},
}

func InitPageState(grid [][]int) [][]TileData {
	grid_html := [][]TileData{}

	for row := range grid {
		row_arr := []TileData{}
		for col := range grid[0] {
			row_arr = append(row_arr, tile_html_mappings[grid[row][col]])
		}
		grid_html = append(grid_html, row_arr)
	}

	return grid_html
}
