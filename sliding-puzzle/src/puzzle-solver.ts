type Solution = {
  movesToSolve: number;
  transitionSequence: number[][][];
};

type GridIndex = {
  row: number;
  col: number;
};

const Direction = {
  Up: "U",
  Right: "R",
  Down: "D",
  Left: "L",
};

type Direction = (typeof Direction)[keyof typeof Direction];

type PermutationNode = {
  permutation: number[][];
  steps: string[];
};

export const solvePuzzle = (input: number[][]): Solution => {
  const finalSolvedPuzzle = createSolvedPuzzle(input.length, input[0].length);
  const expectedSolvedPuzzle = createSolvedPuzzle(
    input.length,
    input[0].length
  );

  let currentPermutation = input;
  const steps: string[] = [];
  while (
    JSON.stringify(
      affixSolvedRowsAndColumns(currentPermutation, finalSolvedPuzzle)
    ) !== JSON.stringify(finalSolvedPuzzle)
  ) {
    const partialSolvedPuzzle = solveForTopOrLeft(
      currentPermutation,
      expectedSolvedPuzzle
    );

    steps.push(...partialSolvedPuzzle.steps);
    currentPermutation = partialSolvedPuzzle.permutation;
  }

  const transitionSequence = getTransitionSequence(input, steps);

  return {
    movesToSolve: transitionSequence.length - 1,
    transitionSequence,
  };
};

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

const solveForTopOrLeft = (
  permutation: number[][],
  expectedSolvedPuzzle: number[][]
): PermutationNode => {
  const queue: PermutationNode[] = [{ permutation, steps: [] }];

  while (queue.length !== 0) {
    const node = queue.shift() as PermutationNode;

    if (topSolved(node.permutation, expectedSolvedPuzzle)) {
      node.permutation = node.permutation.slice(1);
      expectedSolvedPuzzle.splice(0, 1);

      return node;
    }

    if (leftSolved(node.permutation, expectedSolvedPuzzle)) {
      node.permutation = node.permutation.map((row) => row.slice(1));
      expectedSolvedPuzzle.forEach((row) => row.splice(0, 1));

      return node;
    }

    const emptyTileIndex = getTileIndex(0, node.permutation);

    const neighbouringTileData = getNeighbouringTileData(
      emptyTileIndex,
      node.permutation
    );

    const newPermutations = neighbouringTileData.map((tileData) => ({
      permutation: swapTile(
        node.permutation,
        emptyTileIndex,
        tileData.tileIndex as GridIndex
      ),
      steps: [...node.steps, tileData.direction],
    }));

    queue.push(...newPermutations);
  }

  throw Error("Top or left unsolvable!");
};

const topSolved = (
  input: number[][],
  expectedSolvedPuzzle: number[][]
): boolean => {
  const topExpected = expectedSolvedPuzzle[0];

  return input[0].every((val, index) => val === topExpected[index]);
};

const leftSolved = (input: number[][], expectedPuzzle: number[][]): boolean => {
  const leftExpected = expectedPuzzle.map((row) => row[0]);

  return input
    .map((row) => row[0])
    .every((val, index) => val === leftExpected[index]);
};

const getTileIndex = (value: number, grid: number[][]): GridIndex => {
  const tileRow = grid.findIndex((row) => row.includes(value));
  const tileCol = grid[tileRow].findIndex((colVal) => colVal === value);

  return {
    row: tileRow,
    col: tileCol,
  };
};

const getNeighbouringTileData = (
  centreTileIndex: GridIndex,
  permutation: number[][]
) => {
  return [
    {
      direction: Direction.Up,
      tileIndex: getNeighbouringTileIndex(
        centreTileIndex,
        [-1, 0],
        permutation
      ),
    },
    {
      direction: Direction.Right,
      tileIndex: getNeighbouringTileIndex(
        centreTileIndex,
        [0, +1],
        permutation
      ),
    },
    {
      direction: Direction.Down,
      tileIndex: getNeighbouringTileIndex(centreTileIndex, [1, 0], permutation),
    },
    {
      direction: Direction.Left,
      tileIndex: getNeighbouringTileIndex(
        centreTileIndex,
        [0, -1],
        permutation
      ),
    },
  ].filter((tileData) => tileData.tileIndex);
};

const getNeighbouringTileIndex = (
  tileIndex: GridIndex,
  delta: number[],
  grid: number[][]
): GridIndex | undefined => {
  try {
    const newIndex = {
      row: tileIndex.row + delta[0],
      col: tileIndex.col + delta[1],
    };
    grid[newIndex.row][newIndex.col];
    return {
      row: tileIndex.row + delta[0],
      col: tileIndex.col + delta[1],
    };
  } catch {
    return undefined;
  }
};

const swapTile = (
  permutation: number[][],
  tileAIndex: GridIndex,
  tileBIndex: GridIndex
): number[][] => {
  const newPermutation = JSON.parse(JSON.stringify(permutation));
  const tileA = permutation[tileAIndex.row][tileAIndex.col];
  const tileB = permutation[tileBIndex.row][tileBIndex.col];

  newPermutation[tileAIndex.row][tileAIndex.col] = tileB;
  newPermutation[tileBIndex.row][tileBIndex.col] = tileA;

  return newPermutation;
};

const affixSolvedRowsAndColumns = (
  puzzle: number[][],
  solvedPuzzle: number[][]
): number[][] => {
  if (
    puzzle.length === solvedPuzzle.length &&
    puzzle[0].length === solvedPuzzle[0].length
  ) {
    return puzzle;
  }

  let puzzleWithAffixed = [];
  const rowsMissing = solvedPuzzle.length - puzzle.length;
  const colsMissing = solvedPuzzle[0].length - puzzle[0].length;

  for (let row = 0; row < rowsMissing; row++) {
    puzzleWithAffixed.push(solvedPuzzle[row]);
  }

  for (let row = rowsMissing; row < puzzle.length + rowsMissing; row++) {
    puzzleWithAffixed.push([
      ...solvedPuzzle[row]?.slice(0, colsMissing),
      ...puzzle[row - rowsMissing],
    ]);
  }

  return puzzleWithAffixed;
};

const getTransitionSequence = (
  input: number[][],
  steps: string[]
): number[][][] => {
  let transitionSequence: number[][][] = [input];
  const direction = {
    [Direction.Up]: [-1, 0],
    [Direction.Right]: [0, +1],
    [Direction.Down]: [+1, 0],
    [Direction.Left]: [0, -1],
  };

  let currentPermutation = input;
  steps.forEach((step) => {
    const zeroTileIndex = getTileIndex(0, currentPermutation);
    const neighbouringTileIndex = getNeighbouringTileIndex(
      zeroTileIndex,
      direction[step],
      currentPermutation
    ) as GridIndex;
    const permutationAfterSwap = swapTile(
      currentPermutation,
      zeroTileIndex,
      neighbouringTileIndex
    );
    transitionSequence.push(permutationAfterSwap);
    currentPermutation = permutationAfterSwap;
  });

  return transitionSequence;
};
