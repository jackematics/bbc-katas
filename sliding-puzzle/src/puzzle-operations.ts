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

export { puzzlesEqual };
