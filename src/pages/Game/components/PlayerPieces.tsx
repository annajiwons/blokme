// Third Party
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

// Components
import { AntButton, AntCard } from '../../../Visual/AppStyles';
import { Col, Divider, Row, Space } from 'antd';
import { RotateRightOutlined, SwapOutlined } from '@ant-design/icons';
import Piece from './Piece';

// Other
import { selectPiece } from '../../../store/actions';
import { PIECES } from '../../../logic/gamelogic/constants';
import { flipMatrix, rotateMatrix } from '../../../logic/gamelogic';
import { RootState } from '../../../store/reducers';

type PlayerPiecesProps = {
  pieceIds: number[];
};

const PlayerPieces: React.FC<PlayerPiecesProps> = ({ pieceIds }) => {
  const dispatch = useDispatch();

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

  const flipSelectedPiece = () => {
    if (selectedPiece) {
      dispatch(selectPiece(flipMatrix(selectedPiece)));
    }
  };

  const rotateSelectedPiece = () => {
    if (selectedPiece) {
      dispatch(selectPiece(rotateMatrix(selectedPiece)));
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
            <Col span={16}>{selectedPiece && <Piece pieceMatrix={selectedPiece} />}</Col>
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
