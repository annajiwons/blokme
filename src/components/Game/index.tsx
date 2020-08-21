// 3rd Party
import { db } from '../../firebase';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';

// Components
import { BasicButton, BasicCard, CenterContainer } from '../Visual/AppStyles';
import { Col, Row } from 'antd';
import Board from './Board';
import Lobby from './Lobby';
import PlayersList from './PlayersList';
import { Redirect } from 'react-router-dom';

// Other
import { addPlayer, clearRoomData, checkValidRoom, joinRoom, removePlayer, startGameResult } from '../../store/actions';
import { RootState } from '../../store/reducers';
import { Player } from '../../store/types';

interface RouteInfo {
  roomName: string;
}

type GameProps = RouteComponentProps<RouteInfo>;

const Game: React.FC<GameProps> = ({ match }) => {
  const dispatch = useDispatch();

  // TODO if roomname in url, redirect to start page with room name filled in
  const board = useSelector((state: RootState) => state.game.board);
  const checkedValidRoom = useSelector((state: RootState) => state.room.checkedValidRoom);
  const gameStarted = useSelector((state: RootState) => state.game.started);
  const playerId = useSelector((state: RootState) => state.room.playerId);
  const playerName = useSelector((state: RootState) => state.room.playerName);
  const players = useSelector((state: RootState) => state.room.players);
  const roomName = useSelector((state: RootState) => state.room.roomName);

  // const [isLoading, setLoading] = useState(true);
  const [currPiece, setCurrPiece] = useState(0);
  const [isRedirectToHome, setRedirectToHome] = useState(false);

  // useEffect(() => {
  //   if (!roomName || !playerName) {
  //     dispatch(clearRoomData());
  //     setRedirectToHome(true);
  //     // dispatch(checkValidRoom(match.params.roomName));
  //   } else if (!!playerId) {
  //     // this is the creator, don't want to join again
  //   } else {
  //     dispatch(joinRoom(playerName, roomName));
  //   }
  // }, []);

  useEffect(() => {
    const playerIdStr = playerId?.toString();
    const roomNameStr = roomName;

    db.ref('rooms/' + roomNameStr + '/players/' + playerIdStr)
      .onDisconnect()
      .remove();
  }, [playerId, roomName]);

  useEffect(() => {
    db.ref('rooms/' + roomName + '/players').on('value', (snapshot) => {
      console.log('snap shot val:');
      console.log(snapshot.val()); // TODO change to update all players
      snapshot.forEach((snap) => {
        dispatch(addPlayer(snap.val()));
      });
    });
  }, []);

  useEffect(() => {
    db.ref('rooms/' + roomName + '/started').on('value', (snapshot) => {
      dispatch(startGameResult(snapshot.val()));
    });
  }, []);

  // TODO: Fix loading
  // useEffect(() => {
  //   if ((!roomName && checkedValidRoom) || !playerName) {
  //     dispatch(clearRoomData());
  //     setRedirectToHome(true);
  //   } else if (roomName) {
  //     console.log('here');
  //     dispatch(joinRoom(playerName, roomName));
  //   }
  //   setLoading(false);
  // }, [checkedValidRoom]);

  if (isRedirectToHome) {
    return <Redirect to="/" />;
  }

  return (
    <>
      <Board board={board} currPiece={currPiece} />
      {/* {gameStarted ? (
        <>
          <Board board={board} currPiece={currPiece} />
        </>
      ) : (
        <Lobby players={players} roomName={roomName} />
      )} */}
    </>
  );
};

export default Game;
