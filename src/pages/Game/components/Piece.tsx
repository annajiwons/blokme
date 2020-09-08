// Third Party
import React from 'react';

// Components
import { AntButton, DARK_BLUE, Div, Table, TableBody, TableData, TableRow } from '../../../Visual/AppStyles';
import { PushpinOutlined } from '@ant-design/icons';

// Other
import { PIECE_SIDE_LEN, PieceType, PLAYER_COLORS } from '../../../logic/gamelogic/constants';
import { copyFile } from 'fs';

type PieceProps = {
  piece: PieceType;
  playerId: number;
  setSelectedPiece: (
    value: (PieceType | undefined) | ((prevVar: PieceType | undefined) => PieceType | undefined),
  ) => void;
  isSelectedPiece?: boolean;
};

const Piece: React.FC<PieceProps> = ({ piece, playerId, setSelectedPiece, isSelectedPiece }) => {
  const isCenter = (rowI: number, colI: number): boolean => {
    const halfLen = Math.floor(PIECE_SIDE_LEN / 2);
    console.log(halfLen);
    console.log(rowI);
    console.log(colI);
    return rowI === halfLen && colI === halfLen;
  };

  const renderPiece = () => {
    return piece.matrix.map((row, rowI) => {
      return (
        <TableRow key={rowI}>
          {row.map((tile, colI) => {
            if (tile === 0) {
              return (
                <TableData
                  border="transparent"
                  height={isSelectedPiece ? '20px' : '14px'}
                  key={`${rowI}-${colI}`}
                  padding="0"
                  width={isSelectedPiece ? '20px' : '14px'}
                />
              );
            }
            return (
              <TableData
                border={`1px solid ${DARK_BLUE}`}
                height={isSelectedPiece ? '20px' : '14px'}
                key={`${rowI}-${colI}`}
                margin="0"
                padding="0"
                width={isSelectedPiece ? '20px' : '14px'}
              >
                {isSelectedPiece ? (
                  <AntButton border="none" borderRadius="0" height="100%" margin="0" padding="0" width="100%">
                    <Div
                      backgroundColor={PLAYER_COLORS[playerId]}
                      border="none"
                      borderRadius="0"
                      height="100%"
                      margin="0"
                      padding="0"
                      width="100%"
                    >
                      {' '}
                      {isCenter(rowI, colI) && <PushpinOutlined />}
                    </Div>
                  </AntButton>
                ) : (
                  <AntButton
                    border="none"
                    borderRadius="0"
                    height="100%"
                    margin="0"
                    onClick={() => setSelectedPiece(piece)}
                    padding="0"
                    width="100%"
                  >
                    <Div
                      backgroundColor={PLAYER_COLORS[playerId]}
                      border="none"
                      borderRadius="0"
                      height="100%"
                      margin="0"
                      padding="0"
                      width="100%"
                    />
                  </AntButton>
                )}
              </TableData>
            );
          })}
        </TableRow>
      );
    });
  };

  return (
    <>
      <Table margin="0" padding="0">
        <TableBody>{renderPiece()}</TableBody>
      </Table>
    </>
  );
};

export default Piece;
