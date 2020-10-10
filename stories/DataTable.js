import React from 'react';
import PageNumbers from '../src/PageNumbers';
import { usePagination, Table, useSortBy } from '../src';

function DataTable(props) {
  const {
    data,
    rowsPerPage,
    defaultSortBy,
    ...tableProps
  } = props;

  const sorting = useSortBy({data, defaultSortBy});
  const { sortedData } = sorting;
  const pager = usePagination({data: sortedData, rowsPerPage});
  const { dataPerPage } = pager;

  return (
    <div className="cb-DataTable">
      <Table data={dataPerPage} {...sorting} {...tableProps} />
      {rowsPerPage && <PageNumbers {...pager} />}
    </div>
  )
}

export default DataTable;
