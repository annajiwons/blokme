// Third Party
import React, { useEffect } from 'react';

// Components
import { CenterContainer, Table, TableBody, TableRow } from '../../../Visual/AppStyles';
import Tile from './Tile';

// Other
import { PieceType } from '../../../logic/gamelogic/constants';
import { isValidPosition } from '../../../logic/gamelogic';

type BoardProps = {
  board: number[][];
  playerId: number;
  roomName: string;
  selectedPiece?: PieceType;
  setSelectedPiece: (
    value: (PieceType | undefined) | ((prevVar: PieceType | undefined) => PieceType | undefined),
  ) => void;
  turn: number;
};

const Board: React.FC<BoardProps> = ({ board, playerId, roomName, selectedPiece, setSelectedPiece, turn }) => {
  const renderBoard = () => {
    return board.map((row, rowI) => {
      return (
        <TableRow key={rowI} margin="0">
          {row.map((tile, colI) => {
            return (
              <Tile
                board={board}
                column={colI}
                key={`${rowI}-${colI}`}
                playerId={playerId}
                roomName={roomName}
                row={rowI}
                selectedPiece={selectedPiece}
                setSelectedPiece={setSelectedPiece}
                tileVal={tile}
                turn={turn}
              />
            );
          })}
        </TableRow>
      );
    });
  };

  // TODO make responsive for mobile
  return (
    <>
      <CenterContainer>
        <Table margin="0">
          <TableBody>{renderBoard()}</TableBody>
        </Table>
      </CenterContainer>
    </>
  );
};

export default Board;
