import { MAIN_CYAN, MAIN_GREEN, MAIN_RED, MAIN_YELLOW } from '../../Visual/AppStyles';

export const MAX_PLAYERS = 4;

export const QUARTER_LEN = 10;
export const SIDE_LEN = QUARTER_LEN * 2;

export const PIECES = [
  [[1, 1, 1, 1]],
  [
    [1, 1, 1, 1],
    [0, 0, 0, 1],
  ],
  [
    [1, 1, 1, 1],
    [0, 0, 1, 0],
  ],
  [
    [1, 1, 1],
    [0, 0, 1],
  ],
  [
    [1, 1, 1],
    [0, 1, 1],
  ],
  [
    [1, 1, 1],
    [0, 0, 1],
    [0, 0, 1],
  ],
  [
    [1, 1, 0],
    [0, 1, 0],
    [0, 1, 1],
  ],
  [
    [0, 1, 0],
    [1, 1, 1],
    [0, 1, 0],
  ],
  [
    [1, 1, 1],
    [0, 1, 0],
  ],
  [
    [1, 1, 0],
    [0, 1, 1],
    [0, 0, 1],
  ],
  [
    [1, 1, 1],
    [0, 1, 0],
    [0, 1, 0],
  ],
  [
    [1, 1, 0],
    [0, 1, 1],
    [0, 1, 0],
  ],
  [
    [1, 1, 1, 0],
    [0, 0, 1, 1],
  ],
  [
    [1, 1, 0],
    [0, 1, 1],
  ],
  [
    [1, 1],
    [0, 1],
  ],
  [
    [1, 1],
    [1, 1],
  ],
  [[1]],
  [[1, 1, 1, 1, 1]],
  [[1, 1, 1]],
  [[1, 1]],
  [
    [1, 1, 1],
    [1, 0, 1],
  ],
];

export const INITIAL_BOARD = Array(SIDE_LEN)
  .fill(null)
  .map(() => Array(SIDE_LEN).fill(0));
export const INIIAL_PIECES = Array.from(Array(PIECES.length).keys());

export const PLAYER_COLORS = {
  0: 'null',
  1: MAIN_CYAN,
  2: MAIN_GREEN,
  3: MAIN_RED,
  4: MAIN_YELLOW,
};
