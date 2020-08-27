import React from 'react';

const TableRow = React.forwardRef((props, ref) => {
  const { children, onRowClick, record, index, ...restProps } = props;

  const onClick = React.useCallback((e) => {
    if (!onRowClick) return;
    onRowClick(e, record, index);
  }, [onRowClick, record, index]);

  return (
    <div className="cb-TableRow" onClick={onClick} ref={ref} {...restProps}>
      {children}
    </div>
  )
});

TableRow.displayName = 'TableRow';

export default TableRow;
