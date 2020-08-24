import React from 'react';

const TableRow = React.forwardRef((props, ref) => {
  const { children, ...restProps } = props;

  return (
    <div className="cb-TableRow" ref={ref} {...restProps}>
      {children}
    </div>
  )
});

TableRow.displayName = 'TableRow';

export default TableRow;
