import { solvePuzzle } from "./puzzle-solver";

describe("puzzleSolver", () => {
  it("should solve puzzles", () => {
    const input = [
      [1, 2, 3, 4],
      [5, 0, 6, 8],
      [9, 10, 7, 11],
      [13, 14, 15, 12],
    ];

    const expectedOutput = {
      movesToSolve: 4,
      transitionSequence: [
        [
          [1, 2, 3, 4],
          [5, 0, 6, 8],
          [9, 10, 7, 11],
          [13, 14, 15, 12],
        ],
        [
          [1, 2, 3, 4],
          [5, 6, 0, 8],
          [9, 10, 7, 11],
          [13, 14, 15, 12],
        ],
        [
          [1, 2, 3, 4],
          [5, 6, 7, 8],
          [9, 10, 0, 11],
          [13, 14, 15, 12],
        ],
        [
          [1, 2, 3, 4],
          [5, 6, 7, 8],
          [9, 10, 11, 0],
          [13, 14, 15, 12],
        ],
        [
          [1, 2, 3, 4],
          [5, 6, 7, 8],
          [9, 10, 11, 12],
          [13, 14, 15, 0],
        ],
      ],
    };

    expect(solvePuzzle(input)).toStrictEqual(expectedOutput);
  });
});
