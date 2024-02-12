import usePuzzleBuilder from "../hooks/usePuzzleBuilder";

const SlidingTileSolverDisplay = () => {
  // const { solvePuzzle, solveState, getSolution } = usePuzzleSolver();
  const { initialPuzzle } = usePuzzleBuilder();

  return (
    <>
      <div className="mb-3 flex content-evenly justify-center">
        <button
          className="mr-3 w-20 rounded bg-red-600 py-2 px-4 font-bold text-white hover:bg-red-800 disabled:bg-slate-400"
          // onClick={() => solvePuzzle(initialPuzzle)}
          // disabled={solveState !== SolveState.Init}
        >
          Start
        </button>
        <button
          className="mr-3 w-20 rounded bg-red-600 py-2 px-4 font-bold text-white hover:bg-red-800 disabled:bg-slate-400"
          // disabled={solveState === SolveState.Init}
        >
          Stop
        </button>
        <button
          className="w-20 rounded bg-red-600 py-2 px-4 font-bold text-white hover:bg-red-800 disabled:bg-slate-400"
          // disabled={solveState === SolveState.Init}
        >
          Reset
        </button>
      </div>
      <div className="grid place-items-center">
        {initialPuzzle.map((row, rowIndex) => (
          <div className="flex flex-row">
            {row.map((_, colIndex) => (
              <div className="flex h-[7rem] w-[7rem] items-center justify-center border border-black">
                {initialPuzzle[rowIndex][colIndex] === 0 ? (
                  <p></p>
                ) : (
                  <p className="text-8xl font-extrabold">
                    {initialPuzzle[rowIndex][colIndex]}
                  </p>
                )}
              </div>
            ))}
          </div>
        ))}
      </div>
    </>
  );
};

export default SlidingTileSolverDisplay;
