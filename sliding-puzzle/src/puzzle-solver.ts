import {
  getTileIndex,
  getTileDistance,
  getNeighbouringTileData,
  getTileAbsoluteDistance,
  getNeighbouringTileIndex,
  Direction,
  TileData,
  TileIndex,
} from "./tile-operations";

type Solution = {
  movesToSolve: number;
  transitionSequence: number[][][];
  steps: string;
};

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
    const topLeftValue = expectedSolvedPuzzle[0][0];
    const topLeftSolved = solveTopLeftValue(topLeftValue, currentPermutation);

    steps.push(...topLeftSolved.steps);

    const partialSolvedPuzzle = solveForTopOrLeft(
      topLeftSolved.permutation,
      expectedSolvedPuzzle
    );

    steps.push(...partialSolvedPuzzle.steps);
    currentPermutation = partialSolvedPuzzle.permutation;
  }

  const transitionSequence = getTransitionSequence(input, steps);

  return {
    movesToSolve: transitionSequence.length - 1,
    transitionSequence,
    steps: steps.join("->"),
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

const solveTopLeftValue = (
  topLeftValue: number,
  puzzle: number[][]
): PermutationNode => {
  let updatedPuzzle = JSON.parse(JSON.stringify(puzzle));
  const steps: string[] = [];

  while (updatedPuzzle[0][0] !== topLeftValue) {
    const currentTopLeftValueIndex = getTileIndex(topLeftValue, updatedPuzzle);
    const distanceToTopLeft = getTileDistance(currentTopLeftValueIndex, {
      row: 0,
      col: 0,
    });
    const nextTopLeftTileIndex =
      distanceToTopLeft.row >= distanceToTopLeft.col
        ? {
            row: currentTopLeftValueIndex.row,
            col: currentTopLeftValueIndex.col - 1,
          }
        : {
            row: currentTopLeftValueIndex.row - 1,
            col: currentTopLeftValueIndex.col,
          };

    const forbiddenTileIndexes = [currentTopLeftValueIndex];
    while (
      updatedPuzzle[nextTopLeftTileIndex.row][nextTopLeftTileIndex.col] !==
      topLeftValue
    ) {
      const zeroTileIndex = getTileIndex(0, updatedPuzzle);
      const neighbouringTileData = getNeighbouringTileData(
        zeroTileIndex,
        updatedPuzzle
      ).filter((tileData) => tileData.tileIndex);
      const weightAttached = sortTileDataByWeight(
        zeroTileIndex,
        neighbouringTileData,
        nextTopLeftTileIndex,
        forbiddenTileIndexes
      );

      if (
        zeroTileIndex.row === nextTopLeftTileIndex.row &&
        zeroTileIndex.col === nextTopLeftTileIndex.col
      ) {
        updatedPuzzle = swapTile(
          updatedPuzzle,
          zeroTileIndex,
          currentTopLeftValueIndex
        );

        steps.push(
          zeroTileIndex.row < currentTopLeftValueIndex.row ? "D" : "R"
        );
      } else {
        updatedPuzzle = swapTile(
          updatedPuzzle,
          zeroTileIndex,
          weightAttached[0].tileIndex!
        );
        steps.push(weightAttached[0].direction);
        forbiddenTileIndexes.push(zeroTileIndex);
      }
    }
  }

  return { permutation: updatedPuzzle, steps };
};

const sortTileDataByWeight = (
  zeroTileIndex: TileIndex,
  tileDataList: TileData[],
  destinationTileIndex: TileIndex,
  forbiddenTileIndexes?: TileIndex[]
) => {
  return tileDataList
    .map((tileData) => {
      if (
        forbiddenTileIndexes?.find(
          (forbiddenTile) =>
            tileData.tileIndex?.row === forbiddenTile.row &&
            tileData.tileIndex?.col === forbiddenTile.col
        )
      ) {
        return { ...tileData, weight: 2 };
      }

      if (
        getTileAbsoluteDistance(tileData.tileIndex!, destinationTileIndex) <
        getTileAbsoluteDistance(zeroTileIndex, destinationTileIndex)
      ) {
        return {
          ...tileData,
          weight: 0,
        };
      } else {
        return {
          ...tileData,
          weight: 1,
        };
      }
    })
    .sort((a, b) => a.weight - b.weight);
};

const solveForTopOrLeft = (
  permutation: number[][],
  expectedSolvedPuzzle: number[][]
): PermutationNode => {
  if (JSON.stringify(permutation) === JSON.stringify(expectedSolvedPuzzle)) {
    return { permutation, steps: [] };
  }

  const queue: PermutationNode[] = [{ permutation, steps: [] }];

  let previousTileIndex = { row: 0, col: 0 };
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
    )
      .filter((tileData) => tileData.tileIndex)
      .filter(
        (tileData) =>
          JSON.stringify(tileData.tileIndex) !==
          JSON.stringify(previousTileIndex)
      );

    const newPermutations = neighbouringTileData.map((tileData) => ({
      permutation: swapTile(
        node.permutation,
        emptyTileIndex,
        tileData.tileIndex as TileIndex
      ),
      steps: [...node.steps, tileData.direction],
    }));
    previousTileIndex = emptyTileIndex;

    queue.push(...newPermutations);
  }

  throw Error("This should never throw!");
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

const swapTile = (
  permutation: number[][],
  tileAIndex: TileIndex,
  tileBIndex: TileIndex
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
    ) as TileIndex;
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
