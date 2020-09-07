// Third Party
import React from 'react';

// Components
import { AntButton, AntCard } from '../../../Visual/AppStyles';
import { Col, Divider, Row, Space } from 'antd';
import { RotateRightOutlined, SwapOutlined } from '@ant-design/icons';
import Piece from './Piece';

// Other
import { PieceType, PIECES } from '../../../logic/gamelogic/constants';
import { flipPiece, rotatePiece } from '../../../logic/gamelogic';
import { RootState } from '../../../store/reducers';

type PlayerPiecesProps = {
  pieceIds: number[];
  selectedPiece?: PieceType;
  setSelectedPiece: (
    value: (PieceType | undefined) | ((prevVar: PieceType | undefined) => PieceType | undefined),
  ) => void;
};

const PlayerPieces: React.FC<PlayerPiecesProps> = ({ pieceIds, selectedPiece, setSelectedPiece }) => {
  const renderPieces = () => {
    return (
      <>
        {pieceIds.map((id) => {
          return (
            <Col key={id} span={8}>
              <Piece piece={PIECES[id]} setSelectedPiece={setSelectedPiece} />
            </Col>
          );
        })}
      </>
    );
  };

  const flipSelectedPiece = () => {
    if (selectedPiece) {
      setSelectedPiece(flipPiece(selectedPiece));
    }
  };

  const rotateSelectedPiece = () => {
    if (selectedPiece) {
      setSelectedPiece(rotatePiece(selectedPiece));
    }
  };

  return (
    <>
      <AntCard padding="10%">
        <Space direction="vertical">
          <Row align="middle" justify="space-around">
            {renderPieces()}
          </Row>
          <Divider />
          <Row align="middle" justify="space-between">
            <Col span={16}>{selectedPiece && <Piece piece={selectedPiece} setSelectedPiece={setSelectedPiece} />}</Col>
            <Col span={4}>
              <AntButton shape="circle" icon={<RotateRightOutlined />} onClick={rotateSelectedPiece} />
            </Col>
            <Col span={4}>
              <AntButton shape="circle" icon={<SwapOutlined />} onClick={flipSelectedPiece} />
            </Col>
          </Row>
        </Space>
      </AntCard>
    </>
  );
};

export default PlayerPieces;
