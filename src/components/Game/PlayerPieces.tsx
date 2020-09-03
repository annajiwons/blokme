// Third Party
import React, { useState } from 'react';
import { useSelector } from 'react-redux';

// Components
import { AntButton, AntCard, Table, TableData, TableRow } from '../Visual/AppStyles';
import { Col, Divider, Row, Space } from 'antd';
import { RotateRightOutlined, SwapOutlined } from '@ant-design/icons';
import Piece from './Piece';

// Other
import { PIECES, PIECE_ROTATION } from '../../logic/constants';
import { RootState } from '../../store/reducers';
import { Player } from '../../store/types';

type PlayerPiecesProps = {
  pieceIds: number[];
};

const PlayerPieces: React.FC<PlayerPiecesProps> = ({ pieceIds }) => {
  const selectedPiece = useSelector((state: RootState) => state.game.selectedPiece);

  const renderPieces = () => {
    return (
      <>
        {pieceIds.map((id) => {
          return (
            <Col key={id} span={8}>
              <Piece pieceMatrix={PIECES[id]} />
            </Col>
          );
        })}
      </>
    );
  };

  const flipSelectedPiece = () => {};

  const rotateSelectedPiece = () => {};

  return (
    <>
      <AntCard padding="10%">
        <Space direction="vertical">
          <Row align="middle" justify="space-around">
            {renderPieces()}
          </Row>
          <Divider />
          <Row align="middle" justify="space-between">
            <Col span={16}>{selectedPiece && <Piece pieceMatrix={selectedPiece} />}</Col>
            <Col span={4}>
              <AntButton shape="circle" icon={<RotateRightOutlined />} onClick={rotateSelectedPiece} />
            </Col>
            <Col span={4}>
              <AntButton shape="circle" icon={<SwapOutlined />} onClick={rotateSelectedPiece} />
            </Col>
          </Row>
        </Space>
      </AntCard>
    </>
  );
};

export default PlayerPieces;
