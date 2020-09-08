// Third Party
import { db } from '../firebase';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';

// Other
import { INITIAL_BOARD, MAX_PLAYERS } from '../logic/gamelogic/constants';
import { matrixToString } from '../logic/gamelogic';
import { generateRoomName, getUnusedPlayerId } from '../logic/roomlogic';
import {
  ADD_PLAYER,
  CLEAR_ROOM_DATA,
  REQ_GAME_ACTION,
  REQ_ROOM_ACTION,
  RES_CHECK_ROOM,
  RES_CREATE_ROOM,
  RES_JOIN_ROOM,
  RES_START_GAME,
  RESET_TRIED_JOIN,
  SET_PLAYER_NAME,
  UPDATE_BOARD_LOCAL,
  UPDATE_CORNERS,
  UPDATE_REQ_RESULT,
  GameActionTypes,
  GameState,
  Player,
  RoomActionTypes,
  RoomState,
} from './types';

/*
  ===== PLAYER ACTIONS ======
*/

export const setPlayerName = (name: string): RoomActionTypes => {
  return {
    type: SET_PLAYER_NAME,
    name: name,
  };
};

export const addPlayer = (player: Player): RoomActionTypes => {
  return {
    type: ADD_PLAYER,
    player: player,
  };
};

/*
  ===== ROOM THUNKS ======
*/

// Create room
export const createRoom = (playerName: string): ThunkAction<void, RoomState, unknown, RoomActionTypes> => {
  return async (dispatch: ThunkDispatch<RoomState, unknown, RoomActionTypes>): Promise<void> => {
    dispatch(requestRoomAction());
    console.log('here');

    // TODO: add max # tries
    let roomName: null | string = null;
    while (!roomName) {
      roomName = generateRoomName();
      const roomNameSnapshot = await db.ref('roomNames/' + roomName).once('value');
      if (roomNameSnapshot.exists()) {
        roomName = null;
      }
    }

    await db.ref('roomNames/' + roomName).set({
      inUse: true,
    });

    const player: Player = { id: 1, name: playerName };

    // TODO: save player name, player number, room name in local storage so players can refresh
    await db.ref('rooms/' + roomName).set({
      players: { 1: player },
    });

    dispatch(createRoomResult(roomName));
  };
};

// Join Room
export const checkValidRoom = (roomName: string): ThunkAction<void, RoomState, unknown, RoomActionTypes> => {
  return async (dispatch: ThunkDispatch<RoomState, unknown, RoomActionTypes>): Promise<void> => {
    const roomSnapshot = await db.ref('rooms/' + roomName).once('value');
    console.log(roomSnapshot.exists());
    console.log(roomSnapshot.val());
    dispatch(
      checkValidRoomResult(
        // _proto_ element included in players array, so subtract 1
        roomSnapshot.exists() && roomSnapshot.val().players.length - 1 < MAX_PLAYERS && !roomSnapshot.val().started
          ? roomName
          : null,
      ),
    );
    // TODO check rooms with games in progress
  };
};

export const joinRoom = (
  playerName: string,
  roomName: string,
): ThunkAction<void, RoomState, unknown, RoomActionTypes> => {
  return async (dispatch: ThunkDispatch<RoomState, unknown, RoomActionTypes>): Promise<void> => {
    dispatch(requestRoomAction());

    console.log('roomname is: ' + roomName);

    let roomSnapshot = await db.ref('rooms/' + roomName).once('value');
    console.log('roomsnap is: ');
    console.log(roomSnapshot.val());
    if (!roomSnapshot.val()) {
      console.log('unsuccessful join');
      // TOOD handle
    }

    const playerId: null | number = getUnusedPlayerId(roomSnapshot.val().players);

    if (!playerId) {
      console.log('unsuccessful join'); // TODO HANDLE
      return;
    }

    const player: Player = { id: playerId, name: playerName };

    // TODO fix this :)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const updates: any = {};
    updates[playerId] = player;
    await db.ref('rooms/' + roomName + '/players').update(updates);

    roomSnapshot = await db.ref('rooms/' + roomName).once('value');

    if (!roomSnapshot.val()?.players[playerId]) {
      console.log('unsuccessful join');
      // TODO show error to user
    }
    dispatch(joinRoomResult(player, roomName));
  };
};

/*
  ===== ROOM ACTIONS ======
*/

export const clearRoomData = (): RoomActionTypes => {
  return {
    type: CLEAR_ROOM_DATA,
  };
};

export const requestRoomAction = (): RoomActionTypes => {
  return {
    type: REQ_ROOM_ACTION,
  };
};

export const createRoomResult = (roomName: string): RoomActionTypes => {
  return {
    type: RES_CREATE_ROOM,
    roomName: roomName,
  };
};

export const checkValidRoomResult = (roomName: string | null): RoomActionTypes => {
  return {
    type: RES_CHECK_ROOM,
    roomName: roomName,
  };
};

export const setCheckedValidRoom = (): RoomActionTypes => {
  return {
    type: RESET_TRIED_JOIN,
  };
};

export const joinRoomResult = (player: Player, roomName: string): RoomActionTypes => {
  return {
    type: RES_JOIN_ROOM,
    player: player,
    roomName: roomName,
  };
};

/*
  ===== GAME THUNKS ======
*/

export const startGame = (roomName: string): ThunkAction<void, GameState, unknown, GameActionTypes> => {
  return async (dispatch: ThunkDispatch<GameState, unknown, GameActionTypes>): Promise<void> => {
    dispatch(requestGameAction());
    await db.ref('rooms/' + roomName).update({ board: matrixToString(INITIAL_BOARD), started: true, turn: 1 });
    dispatch(startGameResult(true));
  };
};

export const updateBoardRequest = (
  roomName: string,
  board: number[][],
): ThunkAction<void, GameState, unknown, GameActionTypes> => {
  return async (dispatch: ThunkDispatch<GameState, unknown, GameActionTypes>): Promise<void> => {
    // First update board in local redux state
    dispatch(updateBoardLocal(board));

    // Update in firebase
    dispatch(requestGameAction());
    await db.ref('rooms/' + roomName).update({ board: matrixToString(board) });
    dispatch(updateRequestResult(true)); // TODO update if unsuccesful
  };
};

/*
  ===== GAME ACTIONS ======
*/

export const requestGameAction = (): GameActionTypes => {
  return {
    type: REQ_GAME_ACTION,
  };
};

export const startGameResult = (started: boolean): GameActionTypes => {
  return {
    started: started,
    type: RES_START_GAME,
  };
};

export const updateBoardLocal = (board: number[][]): GameActionTypes => {
  return {
    board: board,
    type: UPDATE_BOARD_LOCAL,
  };
};

export const updateCorners = (corners: number[][]): GameActionTypes => {
  return {
    corners: corners,
    type: UPDATE_CORNERS,
  };
};

export const updateRequestResult = (successful: boolean): GameActionTypes => {
  return {
    successful: successful,
    type: UPDATE_REQ_RESULT,
  };
};
