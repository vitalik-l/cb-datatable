// @flow
import React from 'react';
import type {RowProps} from './types';
import Cell from './Cell';

function Row({columns, row, onRowClick, className, children, index, ...rest}: RowProps) {
  return (
    <tr className={className} onClick={onRowClick ? e => onRowClick(e, row) : null} {...rest}>
      {!children ?
        columns.map((column, i) =>
          <Cell
            column={column}
            row={row}
            index={index}
            key={i}
          />
        ) :
        React.Children.map(children, (child, i) => {
          return (
            <Cell
              column={child.props}
              row={row}
              key={i}
            >
              {React.cloneElement(child, {
                row,
                index
              })}
            </Cell>
          );
        })}
    </tr>
  );
}

export default Row;
