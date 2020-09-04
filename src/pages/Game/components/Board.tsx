// Third Party
import React from 'react';
import { useDispatch } from 'react-redux';

// Components
import { CenterContainer, Table, TableBody, TableRow } from '../../../Visual/AppStyles';
import Tile from './Tile';

// Other
import { validCorner } from '../../../logic/gamelogic';

type BoardProps = {
  board: number[][];
  corners: boolean[][];
  isPlayerTurn: boolean;
  playerId: number;
  selectedPiece?: number[][];
};

const Board: React.FC<BoardProps> = ({ board, corners, isPlayerTurn, playerId, selectedPiece }) => {
  const dispatch = useDispatch();

  const tileIsClickable = (rowI: number, colI: number) => {
    if (!isPlayerTurn) {
      return false;
    }
    if (selectedPiece) {
      return validCorner(board, rowI, colI, selectedPiece, playerId);
    }
    return true; // TODO when no selected piece, try all leftover pieces in all orientations
  };

  const renderBoard = () => {
    return board.map((row, rowI) => {
      return (
        <TableRow key={rowI} margin="0">
          {row.map((tile, colI) => {
            return <Tile clickable={true} key={`${rowI}-${colI}`} tileVal={tile} />;
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
