import React from 'react';
import TableCell from './TableCell';
import { get } from "./utils/get";
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
    <tr className={clsx('cb-TableRow', className)} onClick={handleClick} ref={ref} {...restProps}>
      {
        React.Children.map(children, (child, childIndex) => {
          if (!child) return;
          const source = child.props.source;
          const value = source ? get(record, source) : undefined;

          return (
            React.cloneElement(cell, {key: childIndex, ...child.props},
              React.cloneElement(child, {record, index, value})
            )
          );
        })
      }
    </tr>
  )
});

TableRow.displayName = 'TableRow';

TableRow.defaultProps = {
  cell: <TableCell />
};

export default TableRow;
