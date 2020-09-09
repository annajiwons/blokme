/* eslint-disable react-hooks/exhaustive-deps */

// 3rd Party
import { db } from '../../firebase';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';

// Components
import { H2, H3 } from '../../Visual/AppStyles';
import { Badge, Col, Row, Modal } from 'antd';
import Board from './components/Board';
import Lobby from './components/Lobby';
import PlayerPieces from './components/PlayerPieces';
import { Redirect } from 'react-router-dom';

// Other
import {
  addPlayer,
  clearGameData,
  clearRoomData,
  // checkValidRoom,
  getScores,
  joinRoom,
  startGameResult,
  updateBoardLocal,
  updateTurnLocal,
} from '../../store/actions';
import { BOARD_SIDE_LEN, PieceType } from '../../logic/gamelogic/constants';
import { stringToMatrix } from '../../logic/gamelogic';
import { RootState } from '../../store/reducers';

interface RouteInfo {
  roomName: string;
}

type GameProps = RouteComponentProps<RouteInfo>;

const Game: React.FC<GameProps> = ({ match }) => {
  const dispatch = useDispatch();

  const board = useSelector((state: RootState) => state.game.board);
  // TODO if roomname in url, redirect to start page with room name filled in
  // const checkedValidRoom = useSelector((state: RootState) => state.room.checkedValidRoom);
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
  const [gameOver, setGameOver] = useState(false);

  const clearDataAndGoToHome = () => {
    dispatch(clearRoomData());
    dispatch(clearGameData());
    setRedirectToHome(true);
  };

  useEffect(() => {
    if (!roomName || !playerName) {
      clearDataAndGoToHome();
      // dispatch(checkValidRoom(match.params.roomName));
    } else if (!!playerId) {
      // Creator, don't want to join again
    } else {
      console.log(`${playerName} is joining room: ${roomName}`);
      dispatch(joinRoom(playerName, roomName));
    }
  }, []);

  // Remove the player from the room if they become disconnected
  useEffect(() => {
    const playerIdStr = playerId?.toString();
    const roomNameStr = roomName;

    db.ref('rooms/' + roomNameStr + '/players/' + playerIdStr)
      .onDisconnect()
      .remove();
  }, []);

  useEffect(() => {
    db.ref('rooms/' + roomName + '/players').on('value', (snapshot) => {
      console.log('players snap shot val:');
      console.log(snapshot.val()); // TODO change to update all players
      snapshot.forEach((snap) => {
        dispatch(addPlayer(snap.val()));
      });
    });
  }, []);

  useEffect(() => {
    db.ref('rooms/' + roomName + '/started').on('value', (snapshot) => {
      if (snapshot.exists()) {
        dispatch(startGameResult(snapshot.val()));
      }
    });
  }, [roomName]);

  useEffect(() => {
    db.ref('rooms/' + roomName + '/board').on('value', (snapshot) => {
      if (snapshot.exists()) {
        dispatch(updateBoardLocal(stringToMatrix(snapshot.val(), BOARD_SIDE_LEN)));
      }
    });
  }, []);

  useEffect(() => {
    db.ref('rooms/' + roomName + '/turn').on('value', (snapshot) => {
      if (snapshot.exists()) {
        dispatch(updateTurnLocal(snapshot.val()));
      }
    });
  }, []);

  useEffect(() => {
    db.ref('rooms/' + roomName + '/ended').on('value', (snapshot) => {
      if (snapshot.exists() && snapshot.val()) {
        dispatch(getScores(roomName));
        setGameOver(true);
      }
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

  const renderScores = () => {
    return Array.from(players)
      .sort((idPlayer1, idPlayer2) => idPlayer2[1].score - idPlayer1[1].score)
      .map(([id, player], i) => {
        return (
          <Row key={id} justify="center">
            <H2>
              {i + 1}. {player.name}: {player.score}
            </H2>
          </Row>
        );
      });
  };

  return (
    <>
      {gameStarted ? (
        <>
          <Row align="middle" justify="space-around">
            <Col span={14}>
              <PlayerPieces
                roomName={roomName}
                pieceIds={pieces}
                playerId={playerId}
                selectedPiece={selectedPiece}
                setSelectedPiece={setSelectedPiece}
                turn={turn}
              />
            </Col>
            <Col span={10}>
              {playerId === turn ? (
                <Badge status="success" text="Your Turn" />
              ) : (
                <Badge status="processing" text={`${players.get(turn)?.name}'s Turn`} />
              )}
              <Board
                board={board}
                playerId={playerId}
                roomName={roomName}
                selectedPiece={selectedPiece}
                setSelectedPiece={setSelectedPiece}
                turn={turn}
              />
            </Col>
          </Row>
          <Modal onCancel={clearDataAndGoToHome} footer={null} visible={gameOver}>
            <Row justify="center">
              <H2 fontWeight="bold">Game Over!</H2>
            </Row>
            <Row justify="center">
              <H3>Scores: </H3>
            </Row>
            {renderScores()}
          </Modal>
        </>
      ) : (
        <Lobby players={players} roomName={roomName} />
      )}
    </>
  );
};

export default Game;
