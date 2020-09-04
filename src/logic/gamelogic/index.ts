// Third Party
import _ from 'lodash';

// Other
import { SIDE_LEN } from './constants';

// Matrix
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

// Corner
export const getInitialCorners = (playerId: number): boolean[][] => {
  const cornersMatrix = Array(SIDE_LEN)
    .fill(null)
    .map(() => Array(SIDE_LEN).fill(false));

  if (playerId === 1) {
    cornersMatrix[0][0] = true;
  } else if (playerId === 2) {
    cornersMatrix[SIDE_LEN - 1][SIDE_LEN - 1] = true;
  } else if (playerId === 3) {
    cornersMatrix[0][SIDE_LEN - 1] = true;
  } else if (playerId === 4) {
    cornersMatrix[SIDE_LEN - 1][0] = true;
  }
  return cornersMatrix;
};

const isValidPlayerTile = (board: number[][], rowI: number, colI: number, playerId: number): boolean => {
  if (rowI < 0 || rowI >= SIDE_LEN || colI < 0 || colI >= SIDE_LEN) {
    return false;
  }
  return board[rowI][colI] == playerId;
};

export const validCorner = (
  board: number[][],
  rowI: number,
  colI: number,
  selectedPiece: number[][],
  playerId: number,
): boolean => {
  // Piece must not go out of board
  // Placing the piece must not overlap another piece
  // Placing the piece must not result in its side touching another piece owned by current player

  return false;
};
