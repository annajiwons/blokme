// Third Party
import _ from 'lodash';
import { combineReducers } from 'redux';

// Other
import { INITIAL_BOARD, INITIAL_PIECES } from '../logic/gamelogic/constants';
import { copyPlayerMap, copyPlayerMapWithAdd } from '../logic/roomlogic';
import {
  ADD_PLAYER,
  CLEAR_GAME_DATA,
  CLEAR_ROOM_DATA,
  REMOVE_PIECE,
  REQ_GAME_ACTION,
  REQ_ROOM_ACTION,
  RES_CHECK_ROOM,
  RES_CREATE_ROOM,
  RES_JOIN_ROOM,
  RES_START_GAME,
  RESET_TRIED_JOIN,
  SET_PLAYER_NAME,
  UPDATE_BOARD_LOCAL,
  UPDATE_PLAYER_SCORE,
  UPDATE_GAME_REQ_RESULT,
  UPDATE_TURN_LOCAL,
  GameActionTypes,
  GameState,
  Player,
  RoomActionTypes,
  RoomState,
} from './types';

// Game
const GAME_INITIAL_STATE: GameState = {
  board: INITIAL_BOARD,
  loading: false,
  pieces: INITIAL_PIECES,
  started: false,
  turn: 1,
};

const game = (state = GAME_INITIAL_STATE, action: GameActionTypes) => {
  switch (action.type) {
    case CLEAR_GAME_DATA:
      return { board: INITIAL_BOARD, loading: false, pieces: INITIAL_PIECES, started: false, turn: 1 };
    case REMOVE_PIECE:
      return { ...state, pieces: state.pieces.filter((piece) => piece !== action.pieceId) };
    case REQ_GAME_ACTION:
      return { ...state, loading: true };
    case RES_START_GAME:
      return { ...state, loading: false, started: action.started };
    case UPDATE_BOARD_LOCAL:
      return { ...state, board: _.cloneDeep(action.board) };
    case UPDATE_GAME_REQ_RESULT:
      return { ...state, loading: false };
    case UPDATE_TURN_LOCAL:
      return { ...state, turn: action.turn };
    default:
      return { ...state };
  }
};

// Room
const ROOM_INITIAL_STATE: RoomState = {
  checkedValidRoom: false,
  loading: false,
  playerId: 0,
  playerName: '',
  players: new Map<number, Player>(),
  roomName: '',
};

const room = (state = ROOM_INITIAL_STATE, action: RoomActionTypes) => {
  switch (action.type) {
    case ADD_PLAYER:
      return {
        ...state,
        players: copyPlayerMapWithAdd(state.players, action.player.id, action.player),
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
        playerId: 1,
        players: copyPlayerMapWithAdd(state.players, 1, { id: 1, name: state.playerName, score: 0 }),
        roomName: action.roomName,
      };
    case RES_JOIN_ROOM:
      return {
        ...state,
        loading: false,
        playerId: action.player.id,
        players: copyPlayerMapWithAdd(state.players, action.player.id, action.player),
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

    case UPDATE_PLAYER_SCORE:
      const newPlayers = copyPlayerMap(state.players);
      const player = newPlayers.get(action.playerId);
      if (player) {
        player.score = action.score;
      }
      return { ...state, players: newPlayers };
    default:
      return { ...state };
  }
};

// Root
export const rootReducer = combineReducers({
  game,
  room,
});

export type RootState = ReturnType<typeof rootReducer>;
