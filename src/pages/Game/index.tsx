// 3rd Party
import { db } from '../../firebase';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';

// Components
import { AntButton, AntCard, CenterContainer, H3 } from '../../Visual/AppStyles';
import { Badge, Col, Row } from 'antd';
import Board from './components/Board';
import Lobby from './components/Lobby';
import PlayersList from './components/PlayersList';
import PlayerPieces from './components/PlayerPieces';
import { Redirect } from 'react-router-dom';

// Other
import {
  addPlayer,
  clearRoomData,
  checkValidRoom,
  joinRoom,
  startGameResult,
  updateCorners,
} from '../../store/actions';
import { PieceType } from '../../logic/gamelogic/constants';
import { getInitialCorners } from '../../logic/gamelogic';
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
  const corners = useSelector((state: RootState) => state.game.corners);
  const gameStarted = useSelector((state: RootState) => state.game.started);
  const pieces = useSelector((state: RootState) => state.game.pieces);
  const playerId = useSelector((state: RootState) => state.room.playerId);
  const playerName = useSelector((state: RootState) => state.room.playerName);
  const players = useSelector((state: RootState) => state.room.players);
  const roomName = useSelector((state: RootState) => state.room.roomName);
  const turn = useSelector((state: RootState) => state.game.turn);

  // const [isLoading, setLoading] = useState(true);
  const [isRedirectToHome, setRedirectToHome] = useState(false);
  const [selectedPiece, setSelectedPiece] = useState<undefined | PieceType>(undefined);

  useEffect(() => {
    if (!roomName || !playerName) {
      dispatch(clearRoomData());
      setRedirectToHome(true);
      // dispatch(checkValidRoom(match.params.roomName));
    } else if (!!playerId) {
      // this is the creator, don't want to join again
      console.log('creator');
    } else {
      console.log('joining');
      dispatch(joinRoom(playerName, roomName));
    }
  }, []);

  useEffect(() => {
    dispatch(updateCorners(getInitialCorners(playerId)));
  }, []);

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

  // TODO add game updates

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
      {gameStarted ? (
        <>
          <Row align="middle" justify="space-around">
            <Col span={14}>
              <PlayerPieces
                pieceIds={pieces}
                playerId={playerId}
                selectedPiece={selectedPiece}
                setSelectedPiece={setSelectedPiece}
              />
            </Col>
            <Col span={10}>
              {playerId === turn ? (
                <Badge status="success" text="Your Turn" />
              ) : (
                <Badge status="processing" text={`${players.get(turn)?.name}\'s Turn`} />
              )}
              <Board
                board={board}
                corners={corners}
                isPlayerTurn={turn === playerId}
                playerId={playerId}
                selectedPiece={selectedPiece}
                turn={turn}
              />
            </Col>
          </Row>
        </>
      ) : (
        <Lobby players={players} roomName={roomName} />
      )}
    </>
  );
};

export default Game;
