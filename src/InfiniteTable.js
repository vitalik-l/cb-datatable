import React from 'react';
import Table from './Table';
import TableHeader from './TableHeader';
import TableBody from './TableBody';
import useSorting from './useSorting';
import clsx from 'clsx';
import useInfinite from './useInfinite';

function InfiniteTable(props) {
  const {data, sortable, orderBy, onSort, children, striped, rowHover, className} = props;
  const {order, setOrder, sortedData} = useSorting({data, orderBy, onSort});
  const {rootProps, tableBodyProps, containerHeight} = useInfinite(sortedData);

  return (
    <div className={clsx('cb-DataTable cb-DataTable--infinite', className)} {...rootProps}>
      <div
        className="cb-TableContainer"
        style={{height: containerHeight}}
      >
        <Table>
          <TableHeader
            setOrder={setOrder}
            sortable={sortable}
            orderBy={order}
          >
            {children}
          </TableHeader>
          <TableBody
            striped={striped}
            rowHover={rowHover}
            {...tableBodyProps}
          >
            {children}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

export default InfiniteTable;
