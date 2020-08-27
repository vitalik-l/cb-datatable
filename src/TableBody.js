import React from 'react';
import TableRow from './TableRow';
import TableCell from './TableCell';

const TableBody = React.forwardRef((props, ref) => {
  const {
    cell,
    row,
    data,
    currentIndex,
    onRowClick,
    children,
    ...restProps
  } = props;

  return (
    <div className="cb-TableBody" ref={ref} {...restProps}>
      {data.map((record, recordIndex) => {
        const index = recordIndex + currentIndex;
        return (
          React.cloneElement(row, {
              onRowClick,
              record,
              index,
              key: index
            },
            React.Children.map(children, (child, i) => {
              if (!child) return;
              return (
                React.cloneElement(cell, {key: i},
                  React.cloneElement(child, {record, index})
                )
              );
            })
          )
        )
      })}
    </div>
  );
});

TableBody.displayName = 'TableBody';

TableBody.defaultProps = {
  currentIndex: 0,
  cell: <TableCell />,
  row: <TableRow />,
};

export default TableBody;
