import { combineReducers } from 'redux';

import { copyPlayerMapWithUpdate } from '../functions';
import {
  ADD_PLAYER,
  CLEAR_ROOM_DATA,
  REQ_ROOM_ACTION,
  RES_CHECK_ROOM,
  RES_CREATE_ROOM,
  RES_JOIN_ROOM,
  RESET_TRIED_JOIN,
  SET_PLAYER_NAME,
  GameState,
  Player,
  RoomActionTypes,
  RoomState,
} from './types';

// Game
const GAME_INITIAL_STATE: GameState = {
  loading: false,
};

// const game = (state = GAME_INITIAL_STATE, action: RequestCreateRoomAction) => {
//     switch (action.type) {
//         default:
//             return { ...state };
//     }
// };

// Room
const ROOM_INITIAL_STATE: RoomState = {
  checkedValidRoom: false,
  loading: false,
  playerName: '',
  playerId: null,
  players: new Map<number, Player>(),
  roomName: '',
};

const room = (state = ROOM_INITIAL_STATE, action: RoomActionTypes) => {
  switch (action.type) {
    case ADD_PLAYER:
      return {
        ...state,
        playerId: action.player.id,
        players: copyPlayerMapWithUpdate(state.players, action.player.id, action.player),
      };
    case CLEAR_ROOM_DATA:
      return {
        checkedValidRoom: false,
        loading: false,
        playerId: 0,
        playerName: '',
        players: new Map<number, Player>(),
        roomName: '',
      };
    case REQ_ROOM_ACTION:
      return { ...state, loading: true };
    case RES_CHECK_ROOM:
      return { ...state, checkedValidRoom: true, loading: false, roomName: action.roomName ? action.roomName : '' };
    case RES_CREATE_ROOM:
      return {
        ...state,
        loading: false,
        playerId: 0,
        players: copyPlayerMapWithUpdate(state.players, 0, { id: 0, name: state.playerName }),
        roomName: action.roomName,
      };
    case RES_JOIN_ROOM:
      return {
        ...state,
        loading: false,
        playerId: action.player.id,
        players: copyPlayerMapWithUpdate(state.players, action.player.id, action.player),
        roomName: action.roomName,
      };
    case RESET_TRIED_JOIN:
      return { ...state, checkedValidRoom: false };
    case SET_PLAYER_NAME: {
      return {
        ...state,
        playerName: action.name,
      };
    }
    default:
      return { ...state };
  }
};

// Root
export const rootReducer = combineReducers({
  // game,
  room,
});

export type RootState = ReturnType<typeof rootReducer>;
