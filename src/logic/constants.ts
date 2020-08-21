export const MAX_PLAYERS = 4;

export const QUARTER_LEN = 10;
export const SIDE_LEN = QUARTER_LEN * 2;

export const PIECES = {
  0: [[1, 1, 1, 1]],
  1: [
    [1, 1, 1, 1],
    [0, 0, 0, 1],
  ],
  2: [
    [1, 1, 1, 1],
    [0, 0, 1, 0],
  ],
  3: [
    [1, 1, 1],
    [0, 0, 1],
  ],
  4: [
    [1, 1, 1],
    [0, 1, 1],
  ],
  5: [
    [1, 1, 1],
    [0, 0, 1],
    [0, 0, 1],
  ],
  6: [
    [1, 1, 0],
    [0, 1, 0],
    [0, 1, 1],
  ],
  7: [
    [0, 1, 0],
    [1, 1, 1],
    [0, 1, 0],
  ],
  8: [
    [1, 1, 1],
    [0, 1, 0],
  ],
  9: [
    [1, 1, 0],
    [0, 1, 1],
    [0, 0, 1],
  ],
  10: [
    [1, 1, 1],
    [0, 1, 0],
    [0, 1, 0],
  ],
  11: [
    [1, 1, 0],
    [0, 1, 1],
    [0, 1, 0],
  ],
  12: [
    [1, 1, 1, 0],
    [0, 0, 1, 1],
  ],
  13: [
    [1, 1, 0],
    [0, 1, 1],
  ],
  14: [
    [1, 1],
    [0, 1],
  ],
  15: [
    [1, 1],
    [1, 1],
  ],
  16: [[1]],
  17: [[1, 1, 1, 1, 1]],
  18: [[1, 1, 1]],
  19: [[1, 1]],
  20: [
    [1, 1, 1],
    [1, 0, 1],
  ],
};

export const INITIAL_BOARD = Array(SIDE_LEN).fill(Array(SIDE_LEN).fill(0));
export const INIIAL_PIECES = Object.keys(PIECES);
