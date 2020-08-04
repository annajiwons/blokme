import { ThunkAction, ThunkDispatch } from 'redux-thunk';

import { db } from '../firebase';
import { generateRoomName } from '../functions';
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
} from './types';

// Player
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

// Create room
export const clearRoomData = (): RoomActionTypes => {
  return {
    type: CLEAR_ROOM_DATA,
  };
};

// Create room
export const createRoom = (playerName: string): ThunkAction<void, GameState, unknown, RoomActionTypes> => {
  return async (dispatch: ThunkDispatch<GameState, unknown, RoomActionTypes>): Promise<void> => {
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

    const player: Player = { id: 0, name: playerName };

    // TODO: save player name, player number, room name in local storage so players can refresh
    await db.ref('rooms/' + roomName).set({
      players: { 0: player },
    });

    dispatch(createRoomResult(roomName));
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

// Join Room
export const checkValidRoom = (roomName: string): ThunkAction<void, GameState, unknown, RoomActionTypes> => {
  return async (dispatch: ThunkDispatch<GameState, unknown, RoomActionTypes>): Promise<void> => {
    const roomNameSnapshot = await db.ref('roomNames/' + roomName).once('value');
    dispatch(checkValidRoomResult(roomNameSnapshot.exists() ? roomName : null));
    // TODO check for full rooms, and rooms with games in progress
  };
};

export const joinRoom = (
  playerName: string,
  roomName: string,
): ThunkAction<void, GameState, unknown, RoomActionTypes> => {
  return async (dispatch: ThunkDispatch<GameState, unknown, RoomActionTypes>): Promise<void> => {
    dispatch(requestRoomAction());

    let roomSnapshot = await db.ref('rooms/' + roomName).once('value');
    const playerId: number = roomSnapshot.val().players.length;

    const player: Player = { id: playerId, name: playerName };

    // TODO fix this :)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const updateObj: any = {};
    updateObj[playerId] = player;
    await db.ref('rooms/' + roomName + '/players').update(updateObj);

    roomSnapshot = await db.ref('rooms/' + roomName).once('value');

    if (!roomSnapshot.val()?.players[playerId]) {
      console.log('unsuccessful join');
      // TODO show error to user
    }
    dispatch(joinRoomResult(player, roomName));
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
