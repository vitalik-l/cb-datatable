// @flow
import React from 'react';
import type {RowProps} from './types';
import Cell from './Cell';

function Row({columns, row, onRowClick}: RowProps) {
  return (
    <tr onClick={onRowClick ? e => onRowClick(e, row) : null}>
      {columns.map((column, i) =>
        <Cell
          column={column}
          row={row}
          key={i} />
      )}
    </tr>
  );
}

export default Row;
