// @flow
import React from 'react';
import Cell from './Cell';

function BodyRowRenderer(row: Object, columns: Array<Object>) {
  return [
    <tr>
      {columns.map((column, i) =>
        <Cell
          column={column}
          row={row}
          key={i} />
      )}
    </tr>
  ]
}

export default BodyRowRenderer;
