// Third Party
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

// Components
import { BasicButton, TableData } from '../Visual/AppStyles';
import { Col, Divider, Row } from 'antd';

// Other
import { RootState } from '../../store/reducers';
import { Player } from '../../store/types';

type TileProps = {
  tileVal: number;
};

const Tile: React.FC<TileProps> = ({ tileVal }) => {
  return (
    <>
      <TableData padding="0px">
        <BasicButton> </BasicButton>
      </TableData>
    </>
  );
};

export default Tile;
