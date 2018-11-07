// @flow
import React from 'react';
import type {RowProps} from './types';
import Cell from './Cell';

function Row({columns, row, onRowClick, className, ...rest}: RowProps) {
  return (
    <tr className={className} onClick={onRowClick ? e => onRowClick(e, row) : null} {...rest}>
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
