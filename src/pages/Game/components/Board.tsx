// Third Party
import React from 'react';
import { useDispatch } from 'react-redux';

// Components
import { CenterContainer, Table, TableRow } from '../../Visual/AppStyles';
import Tile from './Tile';

type BoardProps = {
  board: number[][];
  currPiece: number;
  isPlayerTurn: boolean;
};

const Board: React.FC<BoardProps> = ({ board, currPiece, isPlayerTurn }) => {
  const dispatch = useDispatch();

  const tileIsClickable = () => {
    return isPlayerTurn;
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
        <Table margin="0">{renderBoard()}</Table>
      </CenterContainer>
    </>
  );
};

export default Board;
