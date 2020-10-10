import React from 'react';
import Table from '../src/Table';
import PageNumbers from '../src/PageNumbers';
import usePagination from '../src/usePagination';
import useSorting from '../src/useSorting';

function DataTable(props) {
  const {
    data,
    rowsPerPage,
    orderBy,
    onSort,
    ...tableProps
  } = props;

  // const {order, setOrder, sortedData} = useSorting({data, orderBy, onSort});
  const pager = usePagination({data, rowsPerPage});
  const { dataPerPage } = pager;

  return (
    <div className="cb-DataTable">
      <Table data={dataPerPage} {...tableProps} />
      {rowsPerPage && <PageNumbers {...pager} />}
    </div>
  )
}

export default DataTable;
