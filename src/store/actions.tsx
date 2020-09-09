// Third Party
import { db } from '../firebase';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';

// Other
import { INITIAL_BOARD, MAX_PLAYERS } from '../logic/gamelogic/constants';
import { getNextPlayerId, matrixToString } from '../logic/gamelogic';
import { generateRoomName, getUnusedPlayerId } from '../logic/roomlogic';
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
  UPDATE_ROOM_REQ_RESULT,
  UPDATE_TURN_LOCAL,
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

    // TODO: save player name, player number, room name in local storage so players can refresh
    await db.ref('rooms/' + roomName).set({
      ended: false,
      numSkipped: 0,
      players: { 1: { id: 1, name: playerName, score: 0 } },
      totalPlayers: 1,
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
        roomSnapshot.exists() && roomSnapshot.val().totalPlayers < MAX_PLAYERS && !roomSnapshot.val().started
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

    const player: Player = { id: playerId, name: playerName, score: 0 };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const updates: any = {};
    updates[playerId] = { ...player };
    await db.ref('rooms/' + roomName + '/players').update(updates);
    await db.ref('rooms/' + roomName).update({ totalPlayers: roomSnapshot.val().totalPlayers + 1 }); // TODO combine with above?

    roomSnapshot = await db.ref('rooms/' + roomName).once('value');

    if (!roomSnapshot.val()?.players[playerId]) {
      console.log('unsuccessful join');
      // TODO show error to user
    }
    dispatch(joinRoomResult(player, roomName));
  };
};

export const getScores = (roomName: string): ThunkAction<void, RoomState, unknown, RoomActionTypes> => {
  return async (dispatch: ThunkDispatch<RoomState, unknown, RoomActionTypes>): Promise<void> => {
    dispatch(requestRoomAction());
    const playersSnapshot = await db.ref('rooms/' + roomName + '/players').once('value');

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    playersSnapshot.val().forEach((player: any) => {
      dispatch(updatePlayerScore(player.id, player.score));
    });
    dispatch(updateRoomRequestResult(true)); // TODO update if unsuccesful
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

export const updatePlayerScore = (playerId: number, score: number): RoomActionTypes => {
  return {
    playerId: playerId,
    score: score,
    type: UPDATE_PLAYER_SCORE,
  };
};

export const updateRoomRequestResult = (successful: boolean): RoomActionTypes => {
  return {
    successful: successful,
    type: UPDATE_ROOM_REQ_RESULT,
  };
};

/*
  ===== GAME THUNKS ======
*/

export const skipTurnRequest = (
  playerId: number,
  roomName: string,
  score: number,
): ThunkAction<void, GameState, unknown, GameActionTypes> => {
  return async (dispatch: ThunkDispatch<GameState, unknown, GameActionTypes>): Promise<void> => {
    dispatch(requestGameAction());
    const roomSnapshot = await db.ref('rooms/' + roomName).once('value');
    const totalPlayers = roomSnapshot.val().totalPlayers;

    let nextTurn = getNextPlayerId(playerId, totalPlayers);
    let tried = 1;
    while (roomSnapshot.val().players[nextTurn].skipped && tried < totalPlayers) {
      nextTurn = getNextPlayerId(nextTurn, totalPlayers);
      tried++;
    }

    dispatch(updateTurnLocal(nextTurn));

    await db.ref('rooms/' + roomName + '/players/' + playerId).update({ score: score, skipped: true });
    await db.ref('rooms/' + roomName).update({
      ended: roomSnapshot.val().numSkipped + 1 === roomSnapshot.val().totalPlayers,
      numSkipped: roomSnapshot.val().numSkipped + 1,
      turn: nextTurn,
    }); // TODO combine with above?

    dispatch(updateGameRequestResult(true));
  };
};

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
    dispatch(updateGameRequestResult(true)); // TODO update if unsuccesful
  };
};

export const updateTurnRequest = (
  roomName: string,
  playerId: number,
): ThunkAction<void, GameState, unknown, GameActionTypes> => {
  return async (dispatch: ThunkDispatch<GameState, unknown, GameActionTypes>): Promise<void> => {
    dispatch(requestGameAction());
    const roomSnapshot = await db.ref('rooms/' + roomName).once('value');
    const totalPlayers = roomSnapshot.val().totalPlayers;

    let nextTurn = getNextPlayerId(playerId, totalPlayers);
    console.log(nextTurn);

    let tried = 1;
    while (roomSnapshot.val().players[nextTurn].skipped && tried < totalPlayers) {
      nextTurn = getNextPlayerId(nextTurn, totalPlayers);
      console.log(nextTurn);

      tried++;
    }
    console.log(nextTurn);

    dispatch(updateTurnLocal(nextTurn));

    await db.ref('rooms/' + roomName).update({ turn: nextTurn });
    dispatch(updateGameRequestResult(true)); // TODO update if unsuccesful
  };
};

/*
  ===== GAME ACTIONS ======
*/

export const clearGameData = (): GameActionTypes => {
  return {
    type: CLEAR_GAME_DATA,
  };
};

export const removePiece = (pieceId: number): GameActionTypes => {
  return {
    pieceId: pieceId,
    type: REMOVE_PIECE,
  };
};

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

export const updateGameRequestResult = (successful: boolean): GameActionTypes => {
  return {
    successful: successful,
    type: UPDATE_GAME_REQ_RESULT,
  };
};

export const updateTurnLocal = (turn: number): GameActionTypes => {
  return {
    turn: turn,
    type: UPDATE_TURN_LOCAL,
  };
};
