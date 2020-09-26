import React from 'react';
import TableCell from './TableCell';
import clsx from 'clsx';

const TableRow = React.forwardRef((props, ref) => {
  const { children, cell, className, record, index, onClick, ...restProps } = props;

  const handleClick = React.useMemo(() => {
    if (!onClick) return;
    return e => {
      onClick(e, record, index);
    };
  }, [onClick]);

  return (
    <div className={clsx('cb-TableRow', className)} onClick={handleClick} ref={ref} {...restProps}>
      {
        React.Children.map(children, (child) => {
          if (!child) return;
          return (
            React.cloneElement(cell, {key: child.props.source, ...child.props},
              React.cloneElement(child, {record, index})
            )
          );
        })
      }
    </div>
  )
});

TableRow.displayName = 'TableRow';

TableRow.defaultProps = {
  cell: <TableCell />
};

export default TableRow;
