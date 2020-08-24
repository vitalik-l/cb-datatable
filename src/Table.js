import React from 'react';
import clsx from 'clsx';

const Table = React.forwardRef((props, ref) => {
  const { children, className, ...restProps } = props;

  return (
    <div className={clsx('cb-Table', className)} ref={ref} {...restProps}>
      {children}
    </div>
  )
});

Table.displayName = 'Table';

export default Table;
