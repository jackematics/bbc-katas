const puzzlesEqual = (puzzleA: number[][], puzzleB: number[][]): boolean => {
  if (
    puzzleA.length !== puzzleB.length ||
    puzzleA[0].length !== puzzleB[0].length
  ) {
    return false;
  }

  for (let row = 0; row < puzzleA.length; row++) {
    for (let col = 0; col < puzzleA[0].length; col++) {
      if (puzzleA[row][col] !== puzzleB[row][col]) {
        return false;
      }
    }
  }

  return true;
};

const copyPuzzle = (puzzle: number[][]): number[][] => {
  const puzzleCopy = [];
  for (let row = 0; row < puzzle.length; row++) {
    const newRow = [];
    for (let col = 0; col < puzzle[0].length; col++) {
      newRow.push(puzzle[row][col]);
    }
    puzzleCopy.push(newRow);
  }

  return puzzleCopy;
};

export { puzzlesEqual, copyPuzzle };
