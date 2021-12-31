import React from 'react';
import { StyledCell } from './styles/StyledCell';
import { TETRIMINOS } from '../tetriminos';

const Cell = ({type}) => (
    <StyledCell type={type} color={TETRIMINOS[type].color}></StyledCell>
);

export default React.memo(Cell);