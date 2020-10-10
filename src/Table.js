import React from 'react';
import clsx from 'clsx';
import TableHeader from './TableHeader';
import TableBody from './TableBody';

function Table(props) {
  const {
    data,
    children,
    className,
    stickyHeader,
    striped,
    rowHover,
    onClick,
    onRowClick,
    row
  } = props;

  return (
    <div className={clsx('cb-Table', className, {'cb-Table--sticky-header': stickyHeader})} onClick={onClick}>
      <TableHeader>
        {children}
      </TableHeader>
      <TableBody
        striped={striped}
        data={data}
        rowHover={rowHover}
        onRowClick={onRowClick}
        row={row}
      >
        {children}
      </TableBody>
    </div>
  )
}

export default Table;
