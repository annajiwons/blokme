// Third Party
import React from 'react';
import { useDispatch } from 'react-redux';

// Components
import { BasicButton, BasicCard, CenterContainer, H2 } from '../Visual/AppStyles';
import { Divider, Row } from 'antd';
import PlayersList from './PlayersList';

// Other
import { startGame } from '../../store/actions';
import { Player } from '../../store/types';

type LobbyProps = {
  players: Map<number, Player>;
  roomName: string;
};

const Lobby: React.FC<LobbyProps> = ({ players, roomName }) => {
  const dispatch = useDispatch();

  const renderPlayers = () => {
    return Array.from(players).map(([id, player]) => {
      return (
        <Row key={id} justify="center">
          <H2>{player.name}</H2>
        </Row>
      );
    });
  };

  return (
    <>
      <CenterContainer>
        <BasicCard bordered={false}>
          <Row justify="center">
            <PlayersList players={players} roomName={roomName} />
          </Row>
          <Divider />
          <Row justify="center">
            <BasicButton
              disabled={players.size != 2 && players.size != 4}
              onClick={() => {
                dispatch(startGame(roomName));
              }}
              type="primary"
            >
              Start!
            </BasicButton>{' '}
          </Row>
        </BasicCard>
      </CenterContainer>
    </>
  );
};

export default Lobby;
