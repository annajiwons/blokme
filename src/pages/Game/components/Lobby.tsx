// Third Party
import React from 'react';
import { useDispatch } from 'react-redux';

// Components
import { AntButton, AntCard, CenterContainer } from '../../../Visual/AppStyles';
import { Divider, Row } from 'antd';
import PlayersList from './PlayersList';

// Other
import { startGame } from '../../../store/actions';
import { Player } from '../../../store/types';

type LobbyProps = {
  players: Map<number, Player>;
  roomName: string;
};

const Lobby: React.FC<LobbyProps> = ({ players, roomName }) => {
  const dispatch = useDispatch();

  return (
    <>
      <CenterContainer>
        <AntCard bordered={false} margin="10%" padding="0" width="50%">
          <Row justify="center">
            <PlayersList players={players} roomName={roomName} />
          </Row>
          <Divider />
          <Row justify="center">
            <AntButton
              disabled={players.size !== 2 && players.size !== 4}
              onClick={() => {
                dispatch(startGame(roomName));
              }}
              type="primary"
            >
              Start!
            </AntButton>{' '}
          </Row>
        </AntCard>
      </CenterContainer>
    </>
  );
};

export default Lobby;
