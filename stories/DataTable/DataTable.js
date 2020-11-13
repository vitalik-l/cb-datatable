import React from 'react';
import PageNumbers from '../../src/PageNumbers';
import { usePagination, Table, useSortBy, HeaderCell, Column, useRowSelect } from '../../src/index';

function DataTable(props) {
  const {
    data,
    rowsPerPage,
    sortBy,
    sortable,
    selectable,
    children,
    ...tableProps
  } = props;
  const sorting = useSortBy({data, sortBy});
  const { sortedData, ...otherSortingProps } = sorting;
  const pagination = usePagination({data: sortedData, rowsPerPage});
  const { dataPerPage } = pagination;
  const { toggleAllRowsSelected, isAllRowsSelected, isRowSelected, toggleRowSelected, selectedRowIds } = useRowSelect({data: dataPerPage, idKey: 'column0'});

  return (
    <div className="cb-DataTable">
      {!!selectedRowIds.length && <div>selected {selectedRowIds.length}</div>}
      <Table data={dataPerPage} headerCell={<HeaderCell sortable={sortable} {...otherSortingProps} />} {...tableProps}>
        {selectable && (
          <Column label={<input type="checkbox" onChange={toggleAllRowsSelected} checked={isAllRowsSelected()} />} sortable={false}>
            {({record}) => {
              return <input type="checkbox" checked={isRowSelected(record)} onChange={() => toggleRowSelected(record)}/>;
            }}
          </Column>
        )}
        {children}
      </Table>
      {!!rowsPerPage && <PageNumbers {...pagination} />}
    </div>
  )
}

export default DataTable;
