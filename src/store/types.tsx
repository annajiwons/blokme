/* 
  ROOM ACTION TYPES
*/

// Player
export const ADD_PLAYER = 'ADD_PLAYER';

export const REMOVE_PLAYER = 'REMOVE_PLAYER';

export const SET_PLAYER_NAME = 'SET_PLAYER_NAME';

interface AddPlayerAction {
  type: typeof ADD_PLAYER;
  player: Player;
}

interface RemovePlayerAction {
  type: typeof REMOVE_PLAYER;
  player: Player;
}

interface SetPlayerNameAction {
  type: typeof SET_PLAYER_NAME;
  name: string;
}

// Room
export const CLEAR_ROOM_DATA = 'CLEAR_ROOM_DATA';

export const REQ_ROOM_ACTION = 'REQ_ROOM_ACTION';

export const RES_CREATE_ROOM = 'RES_CREATE_ROOM';

export const RES_CHECK_ROOM = 'RES_CHECK_ROOM';

export const RES_JOIN_ROOM = 'RES_JOIN_ROOM';

export const RESET_TRIED_JOIN = 'RESET_TRIED_JOIN';

interface ClearRoomDataAction {
  type: typeof CLEAR_ROOM_DATA;
}

interface RequestRoomAction {
  type: typeof REQ_ROOM_ACTION;
}

interface ResultCreateRoomAction {
  type: typeof RES_CREATE_ROOM;
  roomName: string;
}

interface ResultCheckedRoomAction {
  type: typeof RES_CHECK_ROOM;
  roomName: string | null;
}

interface ResultJoinRoomAction {
  type: typeof RES_JOIN_ROOM;
  player: Player;
  roomName: string;
}

interface ResetCheckedValidRoomAction {
  type: typeof RESET_TRIED_JOIN;
}

export type RoomActionTypes =
  | AddPlayerAction
  | RemovePlayerAction
  | SetPlayerNameAction
  | ClearRoomDataAction
  | RequestRoomAction
  | ResultCreateRoomAction
  | ResultJoinRoomAction
  | ResultCheckedRoomAction
  | ResetCheckedValidRoomAction;

/* 
  GAME ACTION TYPES
*/

export const REQ_GAME_ACTION = 'REQ_GAME_ACTION';

export const RES_START_GAME = 'START_GAME';

export const SELECT_PIECE = 'SELECT_PIECE';

interface RequestGameAction {
  type: typeof REQ_GAME_ACTION;
}

interface ResultStartGameAction {
  started: boolean;
  type: typeof RES_START_GAME;
}

interface SelectPieceAction {
  piece?: number[][];
  type: typeof SELECT_PIECE;
}

export type GameActionTypes = RequestGameAction | ResultStartGameAction | SelectPieceAction;

/* 
  STATE TYPES
*/

// Player
export interface Player {
  id: number;
  name: string;
}

// Room
export interface RoomState {
  checkedValidRoom: boolean;
  loading: boolean;
  playerId: number; // Available id's are 1, 2, 3, 4
  playerName: string;
  players: Map<number, Player>;
  roomName: string;
}

// Game
export interface GameState {
  board: number[][];
  loading: boolean;
  pieces: number[];
  selectedPiece?: number[][];
  started: boolean;
  turn: number; // The current player's id
}
