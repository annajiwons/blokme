// Third Party
import React from 'react';
import { useDispatch } from 'react-redux';

// Components
import { AntButton, DARK_BLUE, Div, TableData } from '../../../Visual/AppStyles';
import { PushpinOutlined } from '@ant-design/icons';

// Other
import { removePiece, updateBoardRequest, updateTurnRequest } from '../../../store/actions';
import { MAX_PLAYERS, PieceType, PLAYER_COLORS } from '../../../logic/gamelogic/constants';
import { getNextPlayerId, isValidInitialPosition, isValidPosition, placePiece } from '../../../logic/gamelogic';

type TileProps = {
  board: number[][];
  column: number;
  playerId: number;
  roomName: string;
  row: number;
  selectedPiece?: PieceType;
  setSelectedPiece: (
    value: (PieceType | undefined) | ((prevVar: PieceType | undefined) => PieceType | undefined),
  ) => void;
  tileVal: number;
  turn: number;
};

const Tile: React.FC<TileProps> = ({
  board,
  column,
  playerId,
  roomName,
  row,
  selectedPiece,
  setSelectedPiece,
  tileVal,
  turn,
}) => {
  const dispatch = useDispatch();

  const tileIsClickable = () => {
    if (playerId !== turn) {
      return false;
    }
    if (selectedPiece) {
      return (
        (tileVal === 0 && isValidInitialPosition(playerId, row, column)) ||
        isValidPosition(board, row, column, selectedPiece, playerId)
      );
    }
    return false;
  };

  const onTileClick = () => {
    if (selectedPiece) {
      const newBoard = placePiece(board, row, column, selectedPiece, playerId);
      dispatch(updateBoardRequest(roomName, newBoard));

      const nextPlayerId = getNextPlayerId(playerId, MAX_PLAYERS);
      dispatch(updateTurnRequest(roomName, nextPlayerId));

      console.log(`selectedpiece id : `);
      console.log(selectedPiece);
      dispatch(removePiece(selectedPiece.id));
      setSelectedPiece(undefined);
    }
  };

  return (
    <>
      <TableData border={`1px solid ${DARK_BLUE}`} height="28px" margin="0" padding="0" width="28px">
        {tileIsClickable() && tileVal === 0 ? (
          <AntButton
            border="none"
            borderRadius="0"
            height="100%"
            icon={<PushpinOutlined />}
            margin="0"
            onClick={onTileClick}
            padding="0"
            width="100%"
          />
        ) : (
          <Div
            backgroundColor={PLAYER_COLORS[tileVal]}
            border="none"
            borderRadius="0"
            height="100%"
            margin="0"
            padding="0"
            width="100%"
          />
        )}
      </TableData>
    </>
  );
};

export default Tile;
