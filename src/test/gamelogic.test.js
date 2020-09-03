import { flipMatrix, rotateMatrix, matrixToString } from '../logic/gamelogic';

const testMatrix1 = [
  [1, 1, 1],
  [0, 0, 1],
  [0, 0, 1],
];

const testMatrix2 = [
  [1, 1, 1, 0],
  [0, 0, 1, 1],
];

// Flip Matrix
it('should flip an odd columned matrix horizontally', () => {
  const flippedMatrix = flipMatrix(testMatrix1);

  const testMatrix1Flipped = [
    [1, 1, 1],
    [1, 0, 0],
    [1, 0, 0],
  ];
  expect(flippedMatrix).toEqual(testMatrix1Flipped);
});

it('should flip an even columned matrix horizontally', () => {
  const flippedMatrix = flipMatrix(testMatrix2);

  const testMatrix2Flipped = [
    [0, 1, 1, 1],
    [1, 1, 0, 0],
  ];
  expect(flippedMatrix).toEqual(testMatrix2Flipped);
});

// Rotate Matrix
it('should rotate a square matrix by 90 degrees', () => {
  let rotatedMatrix = rotateMatrix(testMatrix1);

  const testMatrix1RotatedOnce = [
    [0, 0, 1],
    [0, 0, 1],
    [1, 1, 1],
  ];
  expect(rotatedMatrix).toEqual(testMatrix1RotatedOnce);

  rotatedMatrix = rotateMatrix(rotatedMatrix);

  const testMatrix1RotatedTwice = [
    [1, 0, 0],
    [1, 0, 0],
    [1, 1, 1],
  ];
  expect(rotatedMatrix).toEqual(testMatrix1RotatedTwice);

  rotatedMatrix = rotateMatrix(rotatedMatrix);

  const testMatrix1RotatedThrice = [
    [1, 1, 1],
    [1, 0, 0],
    [1, 0, 0],
  ];
  expect(rotatedMatrix).toEqual(testMatrix1RotatedThrice);

  rotatedMatrix = rotateMatrix(rotatedMatrix);

  expect(rotatedMatrix).toEqual(testMatrix1);
});

it('should rotate a non-square matrix by 90 degrees', () => {
  let rotatedMatrix = rotateMatrix(testMatrix2);

  const testMatrix2RotatedOnce = [
    [0, 1],
    [0, 1],
    [1, 1],
    [1, 0],
  ];
  expect(rotatedMatrix).toEqual(testMatrix2RotatedOnce);

  rotatedMatrix = rotateMatrix(rotatedMatrix);

  const testMatrix2RotatedTwice = [
    [1, 1, 0, 0],
    [0, 1, 1, 1],
  ];
  expect(rotatedMatrix).toEqual(testMatrix2RotatedTwice);

  rotatedMatrix = rotateMatrix(rotatedMatrix);

  const testMatrix2RotatedThrice = [
    [0, 1],
    [1, 1],
    [1, 0],
    [1, 0],
  ];
  expect(rotatedMatrix).toEqual(testMatrix2RotatedThrice);

  rotatedMatrix = rotateMatrix(rotatedMatrix);

  expect(rotatedMatrix).toEqual(testMatrix2);
});

// Convert matrix to string
it('convert a matrix to a string', () => {
  const matrixString = matrixToString(testMatrix1);

  expect(matrixString).toEqual('1,1,1,0,0,1,0,0,1');
});
