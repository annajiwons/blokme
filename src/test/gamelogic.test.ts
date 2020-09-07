import { PieceType } from '../logic/gamelogic/constants';
import { flipPiece, rotatePiece, matrixToString } from '../logic/gamelogic';

const testPiece1 = {
  corners: [
    [1, 1],
    [1, 2],
    [2, 2],
    [2, 3],
    [3, 3],
  ],
  id: 9,
  matrix: [
    [0, 0, 0, 0, 0],
    [0, 1, 1, 0, 0],
    [0, 0, 1, 1, 0],
    [0, 0, 0, 1, 0],
    [0, 0, 0, 0, 0],
  ],
};

const testPiece2 = {
  corners: [
    [1, 0],
    [1, 2],
    [2, 2],
    [2, 3],
  ],
  id: 12,
  matrix: [
    [0, 0, 0, 0, 0],
    [1, 1, 1, 0, 0],
    [0, 0, 1, 1, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
  ],
};

const assertPieceEquals = (piece1: PieceType, piece2: PieceType) => {
  expect(piece1.corners.length).toEqual(piece2.corners.length);
  for (const coord of piece2.corners) {
    expect(piece1.corners).toContainEqual(coord);
  }
  expect(piece1.id).toEqual(piece2.id);
  expect(piece1.matrix).toEqual(piece2.matrix);
};

// Flip Matrix
it('should flip an odd columned piece horizontally', () => {
  const flippedPiece = flipPiece(testPiece1);

  const testPiece1Flipped = {
    corners: [
      [1, 2],
      [1, 3],
      [2, 1],
      [2, 2],
      [3, 1],
    ],
    id: 9,
    matrix: [
      [0, 0, 0, 0, 0],
      [0, 0, 1, 1, 0],
      [0, 1, 1, 0, 0],
      [0, 1, 0, 0, 0],
      [0, 0, 0, 0, 0],
    ],
  };

  assertPieceEquals(flippedPiece, testPiece1Flipped);
});

it('should flip an even columned piece horizontally', () => {
  const flippedPiece = flipPiece(testPiece2);

  const testMatrix2Flipped = {
    corners: [
      [1, 2],
      [1, 4],
      [2, 1],
      [2, 2],
    ],
    id: 12,
    matrix: [
      [0, 0, 0, 0, 0],
      [0, 0, 1, 1, 1],
      [0, 1, 1, 0, 0],
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
    ],
  };

  assertPieceEquals(flippedPiece, testMatrix2Flipped);
});

// Rotate Matrix
it('should rotate a piece by 90 degrees', () => {
  let rotatedPiece = rotatePiece(testPiece1);

  const testPiece1RotatedOnce = {
    corners: [
      [1, 3],
      [2, 2],
      [2, 3],
      [3, 1],
      [3, 2],
    ],
    id: 9,
    matrix: [
      [0, 0, 0, 0, 0],
      [0, 0, 0, 1, 0],
      [0, 0, 1, 1, 0],
      [0, 1, 1, 0, 0],
      [0, 0, 0, 0, 0],
    ],
  };

  assertPieceEquals(rotatedPiece, testPiece1RotatedOnce);

  rotatedPiece = rotatePiece(rotatedPiece);

  const testPiece1RotatedTwice = {
    corners: [
      [1, 1],
      [2, 1],
      [2, 2],
      [3, 2],
      [3, 3],
    ],
    id: 9,
    matrix: [
      [0, 0, 0, 0, 0],
      [0, 1, 0, 0, 0],
      [0, 1, 1, 0, 0],
      [0, 0, 1, 1, 0],
      [0, 0, 0, 0, 0],
    ],
  };

  assertPieceEquals(rotatedPiece, testPiece1RotatedTwice);

  rotatedPiece = rotatePiece(rotatedPiece);

  const testPiece1RotatedThrice = {
    corners: [
      [1, 2],
      [1, 3],
      [2, 1],
      [2, 2],
      [3, 1],
    ],
    id: 9,
    matrix: [
      [0, 0, 0, 0, 0],
      [0, 0, 1, 1, 0],
      [0, 1, 1, 0, 0],
      [0, 1, 0, 0, 0],
      [0, 0, 0, 0, 0],
    ],
  };

  assertPieceEquals(rotatedPiece, testPiece1RotatedThrice);

  rotatedPiece = rotatePiece(rotatedPiece);

  assertPieceEquals(rotatedPiece, testPiece1);
});

// Convert matrix to string
it('convert a matrix to a string', () => {
  const matrixString = matrixToString(testPiece1.matrix);

  expect(matrixString).toEqual('0,0,0,0,0,0,1,1,0,0,0,0,1,1,0,0,0,0,1,0,0,0,0,0,0');
});
