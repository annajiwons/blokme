/* 
  ACTION TYPES
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

// Create/Join Room
export const CLEAR_ROOM_DATA = 'CLEAR_ROOM_DATA';

export const REQ_ROOM_ACTION = 'REQ_ROOM_ACTION';

export const RES_CREATE_ROOM = 'RES_CREATE_ROOM';

export const RES_CHECK_ROOM = 'RES_CHECK_ROOM';
export const RESET_TRIED_JOIN = 'RESET_TRIED_JOIN';

export const RES_JOIN_ROOM = 'RES_JOIN_ROOM;';

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

interface ResetCheckedValidRoomAction {
  type: typeof RESET_TRIED_JOIN;
}

interface ResultJoinRoomAction {
  type: typeof RES_JOIN_ROOM;
  player: Player;
  roomName: string;
}

interface ClearRoomDataAction {
  type: typeof CLEAR_ROOM_DATA;
}

export type RoomActionTypes =
  | AddPlayerAction
  | ClearRoomDataAction
  | RequestRoomAction
  | ResultCreateRoomAction
  | ResultJoinRoomAction
  | ResultCheckedRoomAction
  | ResetCheckedValidRoomAction
  | SetPlayerNameAction;

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
  playerId: null | number;
  playerName: string;
  players: Map<number, Player>;
  roomName: string;
}

// Game
export interface GameState {
  loading: boolean;
}
