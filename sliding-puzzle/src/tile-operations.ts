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

const tilesEqual = (tileA: TileIndex, tileB: TileIndex): boolean => {
  return tileA.row === tileB.row && tileA.col === tileB.col;
};

export {
  TileIndex,
  TileData,
  Direction,
  calculateTileDistance,
  calculateTileAbsoluteDistance,
  findTileIndex,
  tilesEqual,
};
