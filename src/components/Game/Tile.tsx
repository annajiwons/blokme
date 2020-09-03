// Third Party
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

// Components
import { AntButton, DARK_BLUE, TableData } from '../Visual/AppStyles';
import { Col, Divider, Row } from 'antd';

// Other
import { RootState } from '../../store/reducers';
import { Player } from '../../store/types';

type TileProps = {
  clickable: boolean;
  tileVal: number;
};

const Tile: React.FC<TileProps> = ({ clickable, tileVal }) => {
  const onTileClick = () => {
    console.log('clicked');
  };

  return (
    <>
      <TableData border={`1px solid ${DARK_BLUE}`} height="24px" margin="0" padding="0" width="24px">
        <AntButton border="none" borderRadius="0" height="100%" margin="0" padding="0" width="100%">
          {' '}
        </AntButton>
      </TableData>
    </>
  );
};

export default Tile;
