import React from 'react';
import PageNumbers from '../../src/PageNumbers';
import { usePagination, Table, useSortBy, HeaderCell } from '../../src/index';

function DataTable(props) {
  const {
    data,
    rowsPerPage,
    defaultSortBy,
    sortable,
    ...tableProps
  } = props;

  const sorting = useSortBy({data, defaultSortBy});
  const { sortedData, ...otherSortingProps } = sorting;
  const pager = usePagination({data: sortedData, rowsPerPage});
  const { dataPerPage } = pager;

  return (
    <div className="cb-DataTable">
      <Table data={dataPerPage} headerCell={<HeaderCell sortable={sortable} {...otherSortingProps} />} {...tableProps} />
      {!!rowsPerPage && <PageNumbers {...pager} />}
    </div>
  )
}

export default DataTable;
