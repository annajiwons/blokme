// Third Party
import React from 'react';
import { useDispatch } from 'react-redux';

// Components
import { AntButton, DARK_BLUE, Table, TableBody, TableData, TableRow } from '../../../Visual/AppStyles';

// Other
import { selectPiece } from '../../../store/actions';

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
        <TableBody>{renderPiece()}</TableBody>
      </Table>
    </>
  );
};

export default Piece;
