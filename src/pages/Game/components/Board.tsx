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
  corners: number[][];
  isPlayerTurn: boolean;
  playerId: number;
  selectedPiece?: PieceType;
  turn: number;
};

const Board: React.FC<BoardProps> = ({ board, corners, isPlayerTurn, playerId, selectedPiece, turn }) => {
  const tileIsClickable = (rowI: number, colI: number) => {
    // if (!isPlayerTurn) {
    //   return false;
    // }
    if (selectedPiece) {
      return isValidPosition(board, rowI, colI, selectedPiece, playerId);
    }
    return false;
  };

  // TODO: make all not clickable, then watch selectedPiece var for changes
  // if change occurs, then update only relevent tiles to be clickable
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
                row={rowI}
                selectedPiece={selectedPiece}
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
