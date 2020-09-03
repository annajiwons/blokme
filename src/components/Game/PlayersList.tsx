// Third Party
import React from 'react';

// Components
import { AntCard, H2, H3, H4 } from '../Visual/AppStyles';
import { Divider, Row, Space } from 'antd';

// Other
import { Player } from '../../store/types';

type PlayersCardProps = {
  players: Map<number, Player>;
  roomName: string;
};

const PlayersCard: React.FC<PlayersCardProps> = ({ players, roomName }) => {
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
    <AntCard padding="5%">
      <Row justify="center">
        <H3>Room Code:</H3>
      </Row>
      <Row justify="center">
        <H2 fontWeight="bold">{roomName}</H2>
      </Row>
      <Divider />
      {renderPlayers()}
    </AntCard>
  );
};

export default PlayersCard;
