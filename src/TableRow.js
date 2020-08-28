import React from 'react';
import clsx from 'clsx';

const TableRow = React.forwardRef((props, ref) => {
  const { children, className, onRowClick, record, index, ...restProps } = props;

  const onClick = React.useCallback((e) => {
    if (!onRowClick) return;
    onRowClick(e, record, index);
  }, [onRowClick, record, index]);

  return (
    <div className={clsx('cb-TableRow', className)} onClick={onClick} ref={ref} {...restProps}>
      {children}
    </div>
  )
});

TableRow.displayName = 'TableRow';

export default TableRow;
