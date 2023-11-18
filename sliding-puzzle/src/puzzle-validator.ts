import { calculateManhattanDistance } from "./puzzle-operations";
import { findTileIndex } from "./tile-operations";

const puzzleSolvable = (puzzle: number[][]): boolean => {
  const zeroTileIndex = findTileIndex(0, puzzle);
  const zeroTileManhattanDistanceParity =
    calculateManhattanDistance(zeroTileIndex, {
      row: puzzle.length - 1,
      col: puzzle[0].length - 1,
    }) % 2;

  const permutationCycleParity = calculatePermutationCycleParity(puzzle);

  return zeroTileManhattanDistanceParity !== permutationCycleParity;
};

const calculatePermutationCycleParity = (puzzle: number[][]): number => {
  const cyclesArray: number[][] = [[0]];
  const possibleValues = Array.from(
    { length: puzzle.length * puzzle[0].length },
    (_, i) => i
  );
  let currentCycleIndex = 0;
  let currentValue = 0;

  while (cyclesArray.flat().length !== puzzle.length * puzzle[0].length) {
    const permutationCycles = mapPuzzleToCycles(puzzle);
    const mappedValue = permutationCycles.get(currentValue);

    if (cyclesArray.flat().includes(mappedValue!)) {
      currentValue = possibleValues.find(
        (value) => !cyclesArray.flat().includes(value)
      )!;

      cyclesArray.push([currentValue]);
      currentCycleIndex++;
    } else {
      cyclesArray[currentCycleIndex].push(mappedValue!);
      currentValue = mappedValue!;
    }
  }

  return cyclesArray.length % 2;
};

const mapPuzzleToCycles = (puzzle: number[][]): Map<number, number> => {
  const permutationCycles = new Map<number, number>();

  for (let row = 0; row < puzzle.length; row++) {
    for (let col = 0; col < puzzle[0].length; col++) {
      permutationCycles.set(col + row * puzzle[0].length, puzzle[row][col]);
    }
  }

  return permutationCycles;
};

export { puzzleSolvable };
