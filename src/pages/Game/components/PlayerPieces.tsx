// Third Party
import React from 'react';
import { useDispatch } from 'react-redux';

// Components
import { AntButton, AntCard } from '../../../Visual/AppStyles';
import { Col, Divider, Row, Space } from 'antd';
import { PushpinOutlined, RotateRightOutlined, SwapOutlined } from '@ant-design/icons';
import Piece from './Piece';

// Other
import { skipTurnRequest, updateTurnRequest } from '../../../store/actions';
import { MAX_PLAYERS, PieceType, PIECES } from '../../../logic/gamelogic/constants';
import { flipPiece, returnScore, rotatePiece } from '../../../logic/gamelogic';
import { RootState } from '../../../store/reducers';

type PlayerPiecesProps = {
  pieceIds: number[];
  playerId: number;
  roomName: string;
  selectedPiece?: PieceType;
  setSelectedPiece: (
    value: (PieceType | undefined) | ((prevVar: PieceType | undefined) => PieceType | undefined),
  ) => void;
  turn: number;
};

const PlayerPieces: React.FC<PlayerPiecesProps> = ({
  pieceIds,
  playerId,
  roomName,
  selectedPiece,
  setSelectedPiece,
  turn,
}) => {
  const dispatch = useDispatch();

  const renderPieces = () => {
    return (
      <>
        {pieceIds.map((id) => {
          return (
            <Col key={id} span={4}>
              <Piece piece={PIECES[id]} playerId={playerId} setSelectedPiece={setSelectedPiece} />
            </Col>
          );
        })}
      </>
    );
  };

  const skipTurn = () => {
    const score = returnScore(pieceIds);
    dispatch(skipTurnRequest(playerId, roomName, score));
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
      <AntCard margin="10%" padding="5%">
        <Space direction="vertical">
          <Row align="middle" justify="space-around">
            {renderPieces()}
          </Row>
          <Divider />
          <Row align="middle" justify="center">
            <Col span={12}>
              {selectedPiece && (
                <Piece isSelectedPiece piece={selectedPiece} playerId={playerId} setSelectedPiece={setSelectedPiece} />
              )}
            </Col>
            <Col span={6}>
              <AntButton disabled={playerId !== turn} margin="0 5%" onClick={skipTurn}>
                Skip
              </AntButton>
            </Col>
            <Col span={3}>
              <AntButton shape="circle" icon={<RotateRightOutlined />} onClick={rotateSelectedPiece} />
            </Col>
            <Col span={3}>
              <AntButton shape="circle" icon={<SwapOutlined />} onClick={flipSelectedPiece} />
            </Col>
          </Row>
        </Space>
      </AntCard>
    </>
  );
};

export default PlayerPieces;
