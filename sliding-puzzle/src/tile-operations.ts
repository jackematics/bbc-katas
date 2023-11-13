type TileIndex = {
  row: number;
  col: number;
};

type TileData = {
  direction: Direction;
  tileIndex: TileIndex | undefined;
};

const Direction = {
  Up: "U",
  Right: "R",
  Down: "D",
  Left: "L",
};

type Direction = (typeof Direction)[keyof typeof Direction];

const calculateTileDistance = (
  tileA: TileIndex,
  tileB: TileIndex
): TileIndex => ({
  row: tileB.row - tileA.row,
  col: tileB.col - tileA.col,
});

const calculateTileAbsoluteDistance = (tileA: TileIndex, tileB: TileIndex) =>
  Math.sqrt(
    Math.pow(tileB.row - tileA.row, 2) + Math.pow(tileB.col - tileA.col, 2)
  );

const findTileIndex = (value: number, puzzle: number[][]): TileIndex => {
  const tileRow = puzzle.findIndex((row) => row.includes(value));
  const tileCol = puzzle[tileRow].findIndex((colVal) => colVal === value);

  return {
    row: tileRow,
    col: tileCol,
  };
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

export {
  TileIndex,
  TileData,
  Direction,
  calculateTileDistance,
  calculateTileAbsoluteDistance,
  findTileIndex,
  findNeighbouringTileData,
  findNeighbouringTileIndex,
};
