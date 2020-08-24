import React from 'react';
import Table from './Table';
import TableHeader from './TableHeader';
import TableBody from './TableBody';
import clsx from 'clsx';
import Pager from './Pager';
import usePager from './usePager';
import {sortData} from './utils/index';

function SimpleTable(props) {
  const {data, children, rowsPerPage, orderBy, className, fixedHeader, sortable, onSort} = props;
  const [order, setOrder] = React.useState(orderBy);
  const sortedData = React.useMemo(() => order && !onSort ? sortData(data, order) : data, [order, data]);
  const pager = usePager(sortedData, rowsPerPage);
  const displayData = pager.dataPerPage;

  React.useEffect(() => {
    if (onSort) onSort(order);
  }, [order]);

  const columns = React.Children.map(children, item => item.props);

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
          columns={columns}
        />
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
