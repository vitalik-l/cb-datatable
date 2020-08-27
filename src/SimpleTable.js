import React from 'react';
import Table from './Table';
import TableHeader from './TableHeader';
import TableBody from './TableBody';
import clsx from 'clsx';
import Pager from './Pager';
import usePager from './usePager';
import useSorting from './useSorting';

function SimpleTable(props) {
  const {data, children, rowsPerPage, orderBy, className, fixedHeader, sortable, onSort} = props;
  const {order, setOrder, sortedData} = useSorting({data, orderBy, onSort});
  const pager = usePager(sortedData, rowsPerPage);
  const displayData = pager.dataPerPage;
  const columns = React.useMemo(() => React.Children.map(children, item => item.props), [children]);

  return (
    <div className="cb-DataTable">
      <Table className={clsx(className, {'cb-Table--fixed-header': fixedHeader})}>
        <TableHeader
          setOrder={setOrder}
          sortable={sortable}
          orderBy={order}
          columns={columns}
        />
        <TableBody
          data={displayData}
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
