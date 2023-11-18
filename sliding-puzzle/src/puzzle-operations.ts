import {
  TileIndex,
  TileData,
  Direction,
  findTileIndex,
} from "./tile-operations";

const createSolvedPuzzle = (rowDim: number, colDim: number): number[][] => {
  const solvedPuzzle: number[][] = [];
  for (let row = 0; row < rowDim; row++) {
    solvedPuzzle.push([]);
    for (let col = 1; col <= colDim; col++) {
      solvedPuzzle[row].push(col + row * solvedPuzzle[0].length);
    }
  }
  solvedPuzzle[rowDim - 1][colDim - 1] = 0;

  return solvedPuzzle;
};

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

const findNeighbouringTileData = (
  centreTileIndex: TileIndex,
  puzzle: number[][]
): TileData[] => {
  return [
    {
      direction: Direction.Up,
      tileIndex: findNeighbouringTileIndex(centreTileIndex, [-1, 0], puzzle),
    },
    {
      direction: Direction.Right,
      tileIndex: findNeighbouringTileIndex(centreTileIndex, [0, +1], puzzle),
    },
    {
      direction: Direction.Down,
      tileIndex: findNeighbouringTileIndex(centreTileIndex, [1, 0], puzzle),
    },
    {
      direction: Direction.Left,
      tileIndex: findNeighbouringTileIndex(centreTileIndex, [0, -1], puzzle),
    },
  ];
};

const findNeighbouringTileIndex = (
  tileIndex: TileIndex,
  delta: number[],
  puzzle: number[][]
): TileIndex | undefined => {
  try {
    const newIndex = {
      row: tileIndex.row + delta[0],
      col: tileIndex.col + delta[1],
    };
    if (puzzle[newIndex.row][newIndex.col]) {
      return {
        row: tileIndex.row + delta[0],
        col: tileIndex.col + delta[1],
      };
    }

    return undefined;
  } catch {
    return undefined;
  }
};

const totalManhattanDistance = (
  puzzle: number[][],
  solvedPuzzle: number[][]
) => {
  let totalManhattanDistance = 0;

  for (let row = 0; row < puzzle.length; row++) {
    for (let col = 0; col < puzzle[0].length; col++) {
      const solvedIndex = findTileIndex(puzzle[row][col], solvedPuzzle);
      totalManhattanDistance += calculateManhattanDistance(
        { row, col },
        solvedIndex
      );
    }
  }

  return totalManhattanDistance;
};

const calculateManhattanDistance = (
  index: TileIndex,
  solvedIndex: TileIndex
) => {
  return (
    Math.abs(index.row - solvedIndex.row) +
    Math.abs(index.col - solvedIndex.col)
  );
};

export {
  calculateManhattanDistance,
  copyPuzzle,
  createSolvedPuzzle,
  findNeighbouringTileData,
  findNeighbouringTileIndex,
  puzzlesEqual,
  totalManhattanDistance,
};
