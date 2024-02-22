package test_helper

func GridsEqual(gridA [][]int, gridB [][]int) bool {
	for row := range gridA {
		for col := range gridA[0] {
			if gridA[row][col] != gridB[row][col] {
				return false
			}
		}
	}

	return true
}

func CountTotalTiles(grid [][]int) int {
	count := 0
	for row := range grid {
		for col := range grid[0] {
			if grid[row][col] > 0 {
				count += dividesByTwoCount(grid[row][col])
			}
		}
	}

	return count
}

func dividesByTwoCount(val int) int {
	count := 0
	for val != 1 {
		val /= 2
		count++
	}

	return count
}
