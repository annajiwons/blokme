// Third Party
import React from 'react';

// Components
import { AntButton, DARK_BLUE, Table, TableBody, TableData, TableRow } from '../../../Visual/AppStyles';

// Other
import { PieceType } from '../../../logic/gamelogic/constants';

type PieceProps = {
  piece: PieceType;
  setSelectedPiece: (
    value: (PieceType | undefined) | ((prevVar: PieceType | undefined) => PieceType | undefined),
  ) => void;
};

const Piece: React.FC<PieceProps> = ({ piece, setSelectedPiece }) => {
  const renderPiece = () => {
    return piece.matrix.map((row, rowI) => {
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
                {/* TODO add selectpiece */}
                <button onClick={() => setSelectedPiece(piece)}></button>
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
