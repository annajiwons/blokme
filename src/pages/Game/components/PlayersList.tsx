// Third Party
import React from 'react';

// Components
import { AntCard, H2, H3 } from '../../../Visual/AppStyles';
import { Divider, Row } from 'antd';

// Other
import { Player } from '../../../store/types';

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
    <AntCard margin="0" padding="10%" width="100%">
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
