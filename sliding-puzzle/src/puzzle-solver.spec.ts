import { solvePuzzle } from "./puzzle-solver";

describe("puzzleSolver", () => {
  it.each([
    {
      input: [
        [5, 8, 6],
        [3, 4, 1],
        [2, 7, 0],
      ],
      expected: {
        movesToSolve: 30,
        steps:
          "L->U->R->U->L->L->D->R->U->L->D->D->R->R->U->L->L->D->R->R->U->U->L->D->D->R->U->L->D->R",
      },
    },
    {
      input: [
        [1, 0, 8],
        [5, 3, 7],
        [6, 4, 2],
      ],
      expected: {
        movesToSolve: 37,
        steps:
          "D->R->D->L->U->R->U->L->D->D->R->U->L->L->D->R->U->L->D->R->R->U->L->D->L->U->R->D->R->U->L->L->D->R->U->R->D",
      },
    },
    {
      input: [
        [6, 7, 2],
        [1, 4, 5],
        [8, 3, 0],
      ],
      expected: {
        movesToSolve: 30,
        steps:
          "U->U->L->L->D->R->U->R->D->L->D->R->U->L->U->R->D->L->D->L->U->R->R->D->L->U->L->D->R->R",
      },
    },
  ])("should solve 3x3 puzzles", ({ input, expected }) => {
    const solution = solvePuzzle(input);
    expect(solution.movesToSolve).toBe(expected.movesToSolve);
    expect(solution.steps).toBe(expected.steps);
  });

  it.each([
    {
      input: [
        [5, 7, 1, 4],
        [0, 8, 2, 11],
        [3, 9, 6, 10],
      ],
      expected: {
        movesToSolve: 68,
        steps:
          "U->R->R->R->D->L->L->L->U->R->R->D->L->D->L->U->R->R->D->L->L->U->R->R->R->U->L->L->D->R->U->L->D->R->D->R->U->U->L->D->L->U->R->D->R->U->L->L->D->R->R->D->L->L->U->R->D->L->U->R->D->R->U->L->L->D->R->R",
      },
    },
  ])("should solve 4x3 puzzles", ({ input, expected }) => {
    const solution = solvePuzzle(input);
    expect(solution.movesToSolve).toBe(expected.movesToSolve);
    expect(solution.steps).toBe(expected.steps);
  });

  it.each([
    {
      input: [
        [1, 2, 3, 4],
        [5, 0, 6, 8],
        [9, 10, 7, 11],
        [13, 14, 15, 12],
      ],
      expected: {
        movesToSolve: 4,
        steps: "R->D->R->D",
      },
    },
    {
      input: [
        [14, 15, 8, 11],
        [4, 12, 1, 3],
        [10, 5, 6, 2],
        [7, 13, 9, 0],
      ],
      expected: {
        movesToSolve: 98,
        steps:
          "U->U->U->L->L->D->R->U->L->L->D->R->U->L->D->D->R->D->R->U->U->L->L->D->R->D->L->U->R->R->R->D->L->U->R->U->L->D->L->U->R->U->L->D->R->D->D->R->U->U->L->D->R->U->U->L->D->D->D->L->U->R->U->L->D->R->U->R->D->L->D->R->U->U->L->D->L->D->R->R->U->L->D->L->U->R->R->D->L->U->L->D->R->R->U->L->D->R",
      },
    },
  ])("should solve 4x4 puzzles", ({ input, expected }) => {
    const solution = solvePuzzle(input);
    expect(solution.movesToSolve).toBe(expected.movesToSolve);
    expect(solution.steps).toBe(expected.steps);
  });
});
