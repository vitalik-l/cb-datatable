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
    row,
    headerCell,
  } = props;

  return (
    <table className={clsx('cb-Table', className, {'cb-Table--sticky-header': stickyHeader})} onClick={onClick}>
      <TableHeader headerCell={headerCell}>
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
    </table>
  )
}

export default Table;
