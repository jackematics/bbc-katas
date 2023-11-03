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

const getTileDistance = (tileA: TileIndex, tileB: TileIndex): TileIndex => ({
  row: tileB.row - tileA.row,
  col: tileB.col - tileA.col,
});

const getTileAbsoluteDistance = (tileA: TileIndex, tileB: TileIndex) =>
  Math.sqrt(
    Math.pow(tileB.row - tileA.row, 2) + Math.pow(tileB.col - tileA.col, 2)
  );

const getTileIndex = (value: number, puzzle: number[][]): TileIndex => {
  const tileRow = puzzle.findIndex((row) => row.includes(value));
  const tileCol = puzzle[tileRow].findIndex((colVal) => colVal === value);

  return {
    row: tileRow,
    col: tileCol,
  };
};

const getNeighbouringTileData = (
  centreTileIndex: TileIndex,
  puzzle: number[][]
): TileData[] => {
  return [
    {
      direction: Direction.Up,
      tileIndex: getNeighbouringTileIndex(centreTileIndex, [-1, 0], puzzle),
    },
    {
      direction: Direction.Right,
      tileIndex: getNeighbouringTileIndex(centreTileIndex, [0, +1], puzzle),
    },
    {
      direction: Direction.Down,
      tileIndex: getNeighbouringTileIndex(centreTileIndex, [1, 0], puzzle),
    },
    {
      direction: Direction.Left,
      tileIndex: getNeighbouringTileIndex(centreTileIndex, [0, -1], puzzle),
    },
  ];
};

const getNeighbouringTileIndex = (
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
  getTileDistance,
  getTileAbsoluteDistance,
  getTileIndex,
  getNeighbouringTileData,
  getNeighbouringTileIndex,
};
