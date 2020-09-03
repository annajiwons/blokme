import _ from 'lodash';

export const flipMatrix = (matrix: number[][]): number[][] => {
  const flipped = _.cloneDeep(matrix);
  for (let row = 0; row < matrix.length; row++) {
    for (let col = 0; col < matrix[row].length / 2; col++) {
      [flipped[row][col], flipped[row][matrix[row].length - col - 1]] = [
        flipped[row][matrix[row].length - col - 1],
        flipped[row][col],
      ];
    }
  }
  return flipped;
};

export const rotateMatrix = (matrix: number[][]): number[][] => {
  const transposed = Array(matrix[0].length)
    .fill(null)
    .map(() => Array(matrix.length).fill(0));

  // First, transpose matrix
  for (let row = 0; row < matrix.length; row++) {
    for (let col = 0; col < matrix[row].length; col++) {
      transposed[col][row] = matrix[row][col];
    }
  }

  // Then flip
  return flipMatrix(transposed);
};

export const matrixToString = (board: number[][]): string => {
  return board.map((row) => row.join()).join();
};
