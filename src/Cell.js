import React from 'react';

function Cell({column, row}) {
  return (
    <td className={column.className ? column.className : null}>
      <div className="table-cell-content">
        {column.renderer ?
          React.createElement(column.renderer, {column, row})
          : row[column.name]}
      </div>
    </td>
  )
}

export default Cell;
