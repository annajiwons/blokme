// Third Party
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// Components
import { CenterContainer, Table, TableRow } from '../Visual/AppStyles';
import { Col, Divider, Row, Space } from 'antd';
import Tile from './Tile';

// Other
import { RootState } from '../../store/reducers';
import { Player } from '../../store/types';

type BoardProps = {
  board: number[][];
  currPiece: number;
};

const Board: React.FC<BoardProps> = ({ board, currPiece }) => {
  const dispatch = useDispatch();

  const renderBoard = () => {
    return board.map((row, rowI) => {
      return (
        <TableRow key={rowI}>
          {row.map((tile, colI) => {
            return <Tile key={rowI + '-' + colI} tileVal={tile} />;
          })}
        </TableRow>
      );
    });
  };

  return (
    <>
      <CenterContainer>
        <Table>{renderBoard()}</Table>
      </CenterContainer>
    </>
  );
};

export default Board;
