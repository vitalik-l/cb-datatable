import React from 'react';
import TableRow from './TableRow';
import TableCell from './TableCell';
import clsx from 'clsx';

const TableBody = React.forwardRef((props, ref) => {
  const {
    cell,
    row,
    data,
    currentIndex,
    onRowClick,
    children,
    striped,
    rowHover,
    className,
    ...restProps
  } = props;

  return (
    <div className={clsx('cb-TableBody', className, {'cb-TableBody--row-hover': rowHover})} ref={ref} {...restProps}>
      {data.map((record, recordIndex) => {
        const index = recordIndex + currentIndex;
        let oddEvenClassName;

        if (striped) {
          oddEvenClassName = index % 2 > 0 ? 'cb-TableRow--odd' : 'cb-TableRow--even';
        }

        return (
          React.cloneElement(row, {
            className: oddEvenClassName,
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
