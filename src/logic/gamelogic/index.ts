// Third Party
import _ from 'lodash';

// Other
import { PieceType, BOARD_SIDE_LEN, PIECE_SIDE_LEN } from './constants';

/**
 * Flips the piece horizontally
 **/
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

/**
 * Rotates the piece by 90 degrees clockwise
 **/
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

export const stringToMatrix = (boardStr: string, n: number): number[][] => {
  const boardStrSplit = boardStr.split(',');

  const board = [];

  let i = 0;
  let inner = [];
  for (const char of boardStrSplit) {
    inner.push(parseInt(char));
    i++;
    if (i === n) {
      board.push(inner);
      i = 0;
      inner = [];
    }
  }

  return board;
};

export const isValidInitialPosition = (playerId: number, selectedRow: number, selectedCol: number): boolean => {
  if (playerId === 1) {
    return selectedRow === 0 && selectedCol === 0;
  } else if (playerId === 2) {
    return selectedRow === BOARD_SIDE_LEN - 1 && selectedCol === BOARD_SIDE_LEN - 1;
  }
  return false;
};

/**
 * Checks if the given coordinates is within the bounds of the board
 **/
const isTileInBounds = (rowI: number, colI: number): boolean => {
  return rowI >= 0 && rowI < BOARD_SIDE_LEN && colI >= 0 && colI < BOARD_SIDE_LEN;
};

/**
 * Checks if filling the coordinate specified by boardRow and boardCol will touch any
 * existing pieces already played by the player
 **/
const touchesOwnPiece = (playerId: number, board: number[][], boardRow: number, boardCol: number): boolean => {
  if (isTileInBounds(boardRow - 1, boardCol)) {
    // Top
    if (board[boardRow - 1][boardCol] === playerId) {
      return true;
    }
  }

  if (isTileInBounds(boardRow, boardCol + 1)) {
    // Right
    if (board[boardRow][boardCol + 1] === playerId) {
      return true;
    }
  }

  if (isTileInBounds(boardRow + 1, boardCol)) {
    // Bottom
    if (board[boardRow + 1][boardCol] === playerId) {
      return true;
    }
  }

  if (isTileInBounds(boardRow, boardCol - 1)) {
    // Left
    if (board[boardRow][boardCol - 1] === playerId) {
      return true;
    }
  }

  return false;
};

/**
 * Checks if filling the coordinate specified by boardRow and boardCol will touch any
 * existing corners of a previously played piece
 **/
const touchesOwnCorner = (playerId: number, board: number[][], boardRow: number, boardCol: number): boolean => {
  if (isTileInBounds(boardRow - 1, boardCol - 1)) {
    // Top left
    if (board[boardRow - 1][boardCol - 1] === playerId) {
      return true;
    }
  }

  if (isTileInBounds(boardRow - 1, boardCol + 1)) {
    // Top right
    if (board[boardRow - 1][boardCol + 1] === playerId) {
      return true;
    }
  }

  if (isTileInBounds(boardRow + 1, boardCol - 1)) {
    // Bottom left
    if (board[boardRow + 1][boardCol - 1] === playerId) {
      return true;
    }
  }

  if (isTileInBounds(boardRow + 1, boardCol + 1)) {
    // Bottom right
    if (board[boardRow + 1][boardCol + 1] === playerId) {
      return true;
    }
  }

  return false;
};

/**
 * Checks if the grid position is a valid place to put the center of the selectedPiece
 **/
export const isValidPosition = (
  board: number[][],
  row: number,
  col: number,
  piece: PieceType,
  playerId: number,
): boolean => {
  if (!isTileInBounds(row, col)) return false;

  for (let pieceRow = 0; pieceRow < PIECE_SIDE_LEN; pieceRow++) {
    for (let pieceCol = 0; pieceCol < PIECE_SIDE_LEN; pieceCol++) {
      const boardRow = row + pieceRow - Math.floor(PIECE_SIDE_LEN / 2);
      const boardCol = col + pieceCol - Math.floor(PIECE_SIDE_LEN / 2);
      if (piece.matrix[pieceRow][pieceCol] === 0) {
        continue; // Ignore, not actually part of piece
      }

      // 1. Piece must not go out of board
      if (!isTileInBounds(boardRow, boardCol)) {
        console.log(`Piece goes out of bounds: ${boardRow}, ${boardCol} is not a valid coordinate`);
        return false;
      }

      // 2. Piece must not intersect with another piece
      if (board[boardRow][boardCol] !== 0) {
        console.log('Piece intersects with another already on board');
        return false;
      }

      // 3. Piece must not result in its side touching the side of a previously played piece owned by
      //    the current player
      if (touchesOwnPiece(playerId, board, boardRow, boardCol)) {
        console.log('Piece touches the side of own piece already placed');
        return false;
      }
    }
  }

  // 4. Piece must touch a corner of a previously played piece
  //    Since it's already been checked that the piece doesn't touch the sides of a previous piece,
  //    just the four diagonal spaces need to be checked
  for (const coord of piece.corners) {
    const boardRow = row + coord[0] - Math.floor(PIECE_SIDE_LEN / 2);
    const boardCol = col + coord[1] - Math.floor(PIECE_SIDE_LEN / 2);

    if (touchesOwnCorner(playerId, board, boardRow, boardCol)) {
      return true;
    }
  }
  console.log('Piece does not touch any existing corners');
  return false;
};

/**
 * Places the piece with the center at the given coordinates and returns the new board.
 **/
export const placePiece = (
  board: number[][],
  row: number,
  col: number,
  piece: PieceType,
  playerId: number,
): number[][] => {
  const boardCopy = _.cloneDeep(board);

  if (isValidPosition(board, row, col, piece, playerId)) {
    for (let pieceRow = 0; pieceRow < PIECE_SIDE_LEN; pieceRow++) {
      for (let pieceCol = 0; pieceCol < PIECE_SIDE_LEN; pieceCol++) {
        const boardRow = row + pieceRow - Math.floor(PIECE_SIDE_LEN / 2);
        const boardCol = col + pieceCol - Math.floor(PIECE_SIDE_LEN / 2);
        if (piece.matrix[pieceRow][pieceCol] === 0) {
          continue; // Ignore, not actually part of piece
        }

        boardCopy[boardRow][boardCol] = playerId;
      }
    }
  }

  return boardCopy;
};

/**
 * Get the playerId of the next player
 **/
export const getNextPlayerId = (currPlayerId: number, numPlayers: number): number => {
  return (currPlayerId % numPlayers) + 1;
};
