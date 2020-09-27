import React from 'react';
import Table from './Table';
import TableHeader from './TableHeader';
import TableBody from './TableBody';
import clsx from 'clsx';
import Pager from './Pager';
import usePager from './usePager';
import useSorting from './useSorting';

function SimpleTable(props) {
  const {
    data,
    children,
    rowsPerPage,
    orderBy,
    className,
    stickyHeader,
    sortable,
    striped,
    rowHover,
    onSort,
    onClick,
    onRowClick,
    row
  } = props;

  const {order, setOrder, sortedData} = useSorting({data, orderBy, onSort});
  const pager = usePager(sortedData, rowsPerPage);
  const displayData = pager.dataPerPage;

  return (
    <div className={clsx('cb-DataTable', className)}>
      <Table className={clsx({'cb-Table--sticky-header': stickyHeader})} onClick={onClick}>
        <TableHeader
          setOrder={setOrder}
          sortable={sortable}
          orderBy={order}
        >
          {children}
        </TableHeader>
        <TableBody
          striped={striped}
          data={displayData}
          rowHover={rowHover}
          onRowClick={onRowClick}
          row={row}
        >
          {children}
        </TableBody>
      </Table>
      {rowsPerPage ? (
        <Pager
          dataLength={data.length}
          currentPage={pager.currentPage}
          rowsPerPage={rowsPerPage}
          onChange={pager.setCurrentPage}
        />
      ) : null}
    </div>
  )
}

export default SimpleTable;
