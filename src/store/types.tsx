/* 
  ROOM ACTION TYPES
*/

// Player
export const ADD_PLAYER = 'ADD_PLAYER';

export const SET_PLAYER_NAME = 'SET_PLAYER_NAME';

interface AddPlayerAction {
  type: typeof ADD_PLAYER;
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

export const UPDATE_PLAYER_SCORE = 'UPDATE_PLAYER_SCORE';

export const UPDATE_ROOM_REQ_RESULT = 'UPDATE_ROOM_REQ_RESULT';

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

interface UpdatePlayerScore {
  playerId: number;
  score: number;
  type: typeof UPDATE_PLAYER_SCORE;
}

interface UpdateRoomRequestResultAction {
  successful: boolean;
  type: typeof UPDATE_ROOM_REQ_RESULT;
}

export type RoomActionTypes =
  | AddPlayerAction
  | SetPlayerNameAction
  | ClearRoomDataAction
  | RequestRoomAction
  | ResultCreateRoomAction
  | ResultJoinRoomAction
  | ResultCheckedRoomAction
  | ResetCheckedValidRoomAction
  | UpdatePlayerScore
  | UpdateRoomRequestResultAction;

/* 
  GAME ACTION TYPES
*/

export const CLEAR_GAME_DATA = 'CLEAR_GAME_DATA';

export const REMOVE_PIECE = 'REMOVE_PIECE';

export const REQ_GAME_ACTION = 'REQ_GAME_ACTION';

export const RES_START_GAME = 'START_GAME';

export const SKIP_TURN = 'SKIP_TURN';

export const UPDATE_BOARD_LOCAL = 'UPDATE_BOARD_LOCAL';

export const UPDATE_GAME_REQ_RESULT = 'UPDATE_GAME_REQ_RESULT';

export const UPDATE_TURN_LOCAL = 'UPDATE_TURN_LOCAL';

interface ClearGameData {
  type: typeof CLEAR_GAME_DATA;
}

interface RemovePieceAction {
  pieceId: number;
  type: typeof REMOVE_PIECE;
}

interface RequestGameAction {
  type: typeof REQ_GAME_ACTION;
}

interface ResultStartGameAction {
  started: boolean;
  type: typeof RES_START_GAME;
}

interface SkipTurnAction {
  playerId: number;
  roomName: string;
  type: typeof SKIP_TURN;
}

interface UpdateBoardAction {
  board: number[][];
  type: typeof UPDATE_BOARD_LOCAL;
}

interface UpdateGameRequestResultAction {
  successful: boolean;
  type: typeof UPDATE_GAME_REQ_RESULT;
}

interface UpdateTurnAction {
  turn: number;
  type: typeof UPDATE_TURN_LOCAL;
}

export type GameActionTypes =
  | ClearGameData
  | RemovePieceAction
  | RequestGameAction
  | ResultStartGameAction
  | SkipTurnAction
  | UpdateBoardAction
  | UpdateGameRequestResultAction
  | UpdateTurnAction;

/* 
  STATE TYPES
*/

// Player
export interface Player {
  id: number;
  name: string;
  score: number;
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
  started: boolean;
  turn: number; // The current player's id
}
