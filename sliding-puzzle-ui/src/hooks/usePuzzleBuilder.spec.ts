import usePuzzleBuilder from "./usePuzzleBuilder";

const { renderHook } = require("@testing-library/react");

describe("usePuzzleBuilder", () => {
  it("should init a 2x2 sliding puzzle with zeros in every space", () => {
    const { result } = renderHook(() => usePuzzleBuilder());

    expect(result.current.initialPuzzle).toStrictEqual([
      [0, 0],
      [0, 0],
    ]);
  });
});
