import React from 'react';

function Cell({column, row, children}) {
  if (column.visible === false) return null;
  return (
    <td className={column.className ? column.className : null}>
      <div className="table-cell-content">
        {!children ?
          column.renderer ?
          React.createElement(column.renderer, {column, row})
          : row[column.name]
        : children}
      </div>
    </td>
  )
}

export default Cell;
