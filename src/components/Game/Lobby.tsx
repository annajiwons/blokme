// Third Party
import React from 'react';
import { useDispatch } from 'react-redux';

// Components
import { BasicButton, BasicCard, CenterContainer, H1, H2, H3, H4 } from '../Visual/AppStyles';
import { Card, Col, Divider, Row, Space } from 'antd';

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
        <BasicCard padding="20px">
          <Space direction="vertical">
            <Row justify="center">
              <H3>Room Code:</H3>
            </Row>
            <Row justify="center">
              <H2 fontWeight="bold">{roomName}</H2>
            </Row>
            <Divider />
            {renderPlayers()}
            <Row justify="center">
              <BasicButton
                disabled={players.size != 2 && players.size != 4}
                margin="20% 0 0 0"
                onClick={() => {
                  dispatch(startGame(roomName));
                }}
                type="primary"
              >
                Start!
              </BasicButton>
            </Row>
          </Space>
        </BasicCard>
      </CenterContainer>
    </>
  );
};

export default Lobby;
