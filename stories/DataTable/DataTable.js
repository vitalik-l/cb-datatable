import React from 'react';
import PageNumbers from '../../src/PageNumbers';
import { usePagination, Table, useSortBy, HeaderCell, Column, useRowSelect, useDataPerPage } from '../../src/index';

function DataTable(props) {
  const {
    data,
    rowsPerPage,
    page,
    onPageChange,
    resetPageOnDataChange,
    dataSize,
    sortBy,
    sortable,
    selectable,
    children,
    multiSort,
    ...tableProps
  } = props;
  const sorting = useSortBy({data, sortBy});
  const { sortedData, ...otherSortingProps } = sorting;
  const pagination = usePagination({ rowsPerPage, page, dataSize: dataSize || data?.length, onChange: onPageChange, });
  const dataPerPage = useDataPerPage({ rowsPerPage, data: sortedData, page: pagination.page });
  const { toggleAllRowsSelected, isAllRowsSelected, isRowSelected, toggleRowSelected, selectedRowIds } = useRowSelect({data: dataPerPage, idKey: 'column0'});

  React.useEffect(() => {
    if (resetPageOnDataChange) {
      pagination.setPage(1);
    }
  }, [data]);

  return (
    <div className="cb-DataTable">
      {!!selectedRowIds.length && <div>selected {selectedRowIds.length}</div>}
      <Table data={dataPerPage} headerCell={<HeaderCell sortable={sortable} multiSort={multiSort} {...otherSortingProps} />} {...tableProps}>
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
