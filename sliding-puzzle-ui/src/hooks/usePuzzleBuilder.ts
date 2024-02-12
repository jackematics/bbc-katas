import { useState } from "react";

const usePuzzleBuilder = () => {
  const [initialPuzzle, setInitialPuzzle] = useState<number[][]>([
    [0, 0],
    [0, 0],
  ]);

  return { initialPuzzle };
};

export default usePuzzleBuilder;
