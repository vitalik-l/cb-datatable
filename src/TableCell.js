import React from 'react';
import clsx from 'clsx';

const TableCell = React.forwardRef((props, ref) => {
  const { children, className, ...restProps } = props;

  return (
    <div className={clsx('cb-TableCell', className)}  ref={ref} {...restProps}>
      {children}
    </div>
  )
});

TableCell.displayName = 'TableCell';

export default TableCell;
