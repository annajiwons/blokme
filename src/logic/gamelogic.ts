export const matrixToString = (board: number[][]): string => {
  return board.map((row) => row.join()).join();
};
