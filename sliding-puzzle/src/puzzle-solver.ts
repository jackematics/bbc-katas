import {
  calculateTileDistance,
  calculateTileAbsoluteDistance,
  findTileIndex,
  Direction,
  TileData,
  TileIndex,
  tilesEqual,
} from "./tile-operations";
import {
  copyPuzzle,
  createSolvedPuzzle,
  findNeighbouringTileData,
  findNeighbouringTileIndex,
  puzzlesEqual,
  totalManhattanDistance,
} from "./puzzle-operations";
import { puzzleSolvable } from "./puzzle-validator";

export type Solution = {
  movesToSolve: number;
  transitionSequence: number[][][];
  steps: string;
};

export type UnsolvableResult = {
  message: string;
};

type PermutationNode = {
  permutation: number[][];
  steps: string[];
  manhattanDistance: number;
};

export const solvePuzzle = (
  puzzle: number[][]
): Solution | UnsolvableResult => {
  if (!puzzleSolvable(puzzle)) {
    return { message: "Error: unsolvable puzzle" };
  }

  const finalSolvedPuzzle = createSolvedPuzzle(puzzle.length, puzzle[0].length);
  const mutatingSolvedPuzzle = createSolvedPuzzle(
    puzzle.length,
    puzzle[0].length
  );

  let currentPermutation = puzzle;
  const steps: string[] = [];

  while (
    !puzzlesEqual(
      affixSolvedRowsAndColumns(currentPermutation, finalSolvedPuzzle),
      finalSolvedPuzzle
    )
  ) {
    const topLeftValue = mutatingSolvedPuzzle[0][0];
    const topLeftSolved = solveTopLeftValue(
      topLeftValue,
      currentPermutation,
      mutatingSolvedPuzzle
    );

    steps.push(...topLeftSolved.steps);

    const partialSolvedPuzzle = solveForTopOrLeft(
      topLeftSolved.permutation,
      mutatingSolvedPuzzle
    );

    steps.push(...partialSolvedPuzzle.steps);
    currentPermutation = partialSolvedPuzzle.permutation;
  }

  const transitionSequence = getTransitionSequence(puzzle, steps);

  return {
    movesToSolve: transitionSequence.length - 1,
    transitionSequence,
    steps: steps.join("->"),
  };
};

const solveTopLeftValue = (
  topLeftValue: number,
  puzzle: number[][],
  solvedPuzzle: number[][]
): PermutationNode => {
  let updatedPuzzle = copyPuzzle(puzzle);
  const steps: string[] = [];

  while (updatedPuzzle[0][0] !== topLeftValue) {
    const currentTopLeftValueIndex = findTileIndex(topLeftValue, updatedPuzzle);
    const distanceToTopLeft = calculateTileDistance(currentTopLeftValueIndex, {
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
      const zeroTileIndex = findTileIndex(0, updatedPuzzle);
      const neighbouringTileData = findNeighbouringTileData(
        zeroTileIndex,
        updatedPuzzle
      ).filter((tileData) => tileData.tileIndex);
      const weightAttached = sortTileDataByWeight(
        neighbouringTileData,
        zeroTileIndex,
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

  return {
    permutation: updatedPuzzle,
    steps,
    manhattanDistance: totalManhattanDistance(updatedPuzzle, solvedPuzzle),
  };
};

const sortTileDataByWeight = (
  tileDataList: TileData[],
  zeroTileIndex: TileIndex,
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
        calculateTileAbsoluteDistance(
          tileData.tileIndex!,
          destinationTileIndex
        ) < calculateTileAbsoluteDistance(zeroTileIndex, destinationTileIndex)
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
  puzzle: number[][],
  expectedSolvedPuzzle: number[][]
): PermutationNode => {
  if (puzzlesEqual(puzzle, expectedSolvedPuzzle)) {
    return { permutation: puzzle, steps: [], manhattanDistance: 0 };
  }

  const visited: number[][][] = [puzzle];
  let queue: PermutationNode[] = [
    {
      permutation: puzzle,
      steps: [],
      manhattanDistance: totalManhattanDistance(puzzle, expectedSolvedPuzzle),
    },
  ];

  let previousTileIndex = { row: 0, col: 0 };
  while (queue.length !== 0) {
    if (queue.length > 15000) {
      queue = queue.filter(
        (node) =>
          node.manhattanDistance < calculateAverageManhattanDistance(queue)
      );
    }

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

    const emptyTileIndex = findTileIndex(0, node.permutation);

    const neighbouringTileData = findNeighbouringTileData(
      emptyTileIndex,
      node.permutation
    )
      .filter((tileData) => tileData.tileIndex)
      .filter(
        (tileData) => !tilesEqual(tileData.tileIndex!, previousTileIndex)
      );

    const neighbouringPermutationNodes = neighbouringTileData
      .map((tileData) => ({
        permutation: swapTile(
          node.permutation,
          emptyTileIndex,
          tileData.tileIndex as TileIndex
        ),
        steps: [...node.steps, tileData.direction],
        manhattanDistance: totalManhattanDistance(
          node.permutation,
          expectedSolvedPuzzle
        ),
      }))
      .filter((permutationNode) => {
        for (let i = 0; i < visited.length; i++) {
          if (puzzlesEqual(visited[i], permutationNode.permutation)) {
            return false;
          }
        }
        return true;
      });

    previousTileIndex = emptyTileIndex;

    queue.push(...neighbouringPermutationNodes);
    visited.push(node.permutation);
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
  const newPermutation = copyPuzzle(permutation);
  const tileA = permutation[tileAIndex.row][tileAIndex.col];
  const tileB = permutation[tileBIndex.row][tileBIndex.col];

  newPermutation[tileAIndex.row][tileAIndex.col] = tileB;
  newPermutation[tileBIndex.row][tileBIndex.col] = tileA;

  return newPermutation;
};

const calculateAverageManhattanDistance = (
  puzzleNodes: PermutationNode[]
): number => {
  let total = 0;
  for (let i = 0; i < puzzleNodes.length; i++) {
    total += puzzleNodes[i].manhattanDistance;
  }

  return Math.ceil(total / puzzleNodes.length);
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
    const zeroTileIndex = findTileIndex(0, currentPermutation);
    const neighbouringTileIndex = findNeighbouringTileIndex(
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
