// Third Party
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

// Components
import { AntButton, DARK_BLUE, Table, TableData, TableRow } from '../Visual/AppStyles';
import { Col, Divider, Row } from 'antd';

// Other
import { selectPiece } from '../../store/actions';
import { PIECES, PIECE_ROTATION } from '../../logic/constants';
import { RootState } from '../../store/reducers';
import { Player } from '../../store/types';

type PieceProps = {
  pieceMatrix: number[][];
};

const Piece: React.FC<PieceProps> = ({ pieceMatrix }) => {
  const dispatch = useDispatch();

  const renderPiece = () => {
    return pieceMatrix.map((row, rowI) => {
      return (
        <TableRow key={rowI}>
          {row.map((tile, colI) => {
            if (tile === 0) {
              return <TableData border="transparent" height="14px" key={`${rowI}-${colI}`} padding="0" width="14px" />;
            }
            return (
              <TableData
                border={`1px solid ${DARK_BLUE}`}
                height="14px"
                key={`${rowI}-${colI}`}
                margin="0"
                padding="0"
                width="14px"
              >
                {/* TODO FIX styling */}
                {/* <AntButton border="none" borderRadius="0" height="100%" margin="0" padding="0" width="100%">
                  {' '}
                </AntButton> */}
                <button onClick={() => dispatch(selectPiece(pieceMatrix))}></button>
              </TableData>
            );
          })}
        </TableRow>
      );
    });
  };

  return (
    <>
      <Table margin="10% 0" padding="0">
        {renderPiece()}
      </Table>
    </>
  );
};

export default Piece;
