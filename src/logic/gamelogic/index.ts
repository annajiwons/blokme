// Third Party
import _ from 'lodash';

// Other
import { PieceType, SIDE_LEN } from './constants';

export const flipPiece = (piece: PieceType): PieceType => {
  const matrix = piece.matrix;

  const flippedMatrix = _.cloneDeep(matrix);
  for (let row = 0; row < matrix.length; row++) {
    for (let col = 0; col < matrix[row].length / 2; col++) {
      [flippedMatrix[row][col], flippedMatrix[row][matrix[row].length - col - 1]] = [
        flippedMatrix[row][matrix[row].length - col - 1],
        flippedMatrix[row][col],
      ];
    }
  }

  const flippedCorners = [];
  for (const coord of piece.corners) {
    flippedCorners.push([coord[0], matrix[0].length - coord[1] - 1]);
  }

  return { corners: flippedCorners, id: piece.id, matrix: flippedMatrix };
};

export const rotatePiece = (piece: PieceType): PieceType => {
  const matrix = piece.matrix;

  // First, transpose matrix and corner coordinates
  const transposedMatrix = Array(matrix[0].length)
    .fill(null)
    .map(() => Array(matrix.length).fill(0));
  for (let row = 0; row < matrix.length; row++) {
    for (let col = 0; col < matrix[row].length; col++) {
      transposedMatrix[col][row] = matrix[row][col];
    }
  }

  const transposedCorners = [];
  for (const coord of piece.corners) {
    transposedCorners.push([coord[1], coord[0]]);
  }

  // Then flip
  return flipPiece({ corners: transposedCorners, id: piece.id, matrix: transposedMatrix });
};

export const matrixToString = (board: number[][]): string => {
  return board.map((row) => row.join()).join();
};

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

const isTileInBounds = (rowI: number, colI: number): boolean => {
  return rowI >= 0 && rowI < SIDE_LEN && colI >= 0 && colI < SIDE_LEN;
};

const isValidPlayerOwnedTile = (board: number[][], rowI: number, colI: number, playerId: number): boolean => {
  if (!isTileInBounds(rowI, colI)) {
    return false;
  }
  return board[rowI][colI] == playerId;
};

export const isValidCorner = (
  board: number[][],
  cornerRow: number,
  cornerCol: number,
  selectedPiece: PieceType,
  playerId: number,
): boolean => {
  let rowAdder = 0;
  let colAdder = 0;

  // 1. Determine direction to iterate board based on previous piece
  if (isValidPlayerOwnedTile(board, cornerRow - 1, cornerCol - 1, playerId)) {
    // Top left
    rowAdder = 1;
    colAdder = 1;
  } else if (isValidPlayerOwnedTile(board, cornerRow - 1, cornerCol + 1, playerId)) {
    // Top right
    rowAdder = 1;
    colAdder = -1;
  } else if (isValidPlayerOwnedTile(board, cornerRow + 1, cornerCol - 1, playerId)) {
    // Bottom left
    rowAdder = -1;
    colAdder = 1;
  } else if (isValidPlayerOwnedTile(board, cornerRow - 1, cornerCol - 1, playerId)) {
    // Bottom right
    rowAdder = -1;
    colAdder = -1;
  } else {
    // Throw error? TODO log
  }

  // 2. Iterate board and piece together
  // for (let row = 0; row < selectedPiece.length; row++) {
  //   for (let col = 0; col < selectedPiece[0].length; col++) {
  //     if (selectedPiece[row][col] === 0) {
  //       // Not actually part of piece, ignore
  //       continue;
  //     }

  //     const boardRow = cornerRow + row * rowAdder;
  //     const borderCol = cornerRow + col * colAdder;

  //     // Piece must not go out of board
  //     // Placing the piece must not overlap another piece
  //     // Placing the piece must not result in its side touching another piece owned by current player
  //   }
  // }

  return false;
};
