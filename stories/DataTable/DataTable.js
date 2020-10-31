import React from 'react';
import PageNumbers from '../../src/PageNumbers';
import { usePagination, Table, useSortBy, HeaderCell, Column } from '../../src/index';

function DataTable(props) {
  const {
    data,
    rowsPerPage,
    defaultSortBy,
    sortable,
    selectable,
    children,
    ...tableProps
  } = props;
  const [selected, setSelected] = React.useState([]);
  const sorting = useSortBy({data, defaultSortBy});
  const { sortedData, ...otherSortingProps } = sorting;
  const pagination = usePagination({data: sortedData, rowsPerPage});
  const { dataPerPage } = pagination;

  const isSelected = (id) => selected.indexOf(id) !== -1;

  const onSelect = (id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }
    setSelected(newSelected);
  };

  const onSelectAll = () => {
    if (selected.length === dataPerPage.length) return setSelected([]);
    setSelected([...new Set([...selected, ...dataPerPage.map(item => item.column0)])]);
  };

  return (
    <div className="cb-DataTable">
      {!!selected.length && <div>selected {selected.length}</div>}
      <Table data={dataPerPage} headerCell={<HeaderCell sortable={sortable} {...otherSortingProps} />} {...tableProps}>
        {selectable && (
          <Column label={<input type="checkbox" onClick={onSelectAll} checked={selected.length === dataPerPage.length} />} sortable={false}>
            {({record}) => {
              return <input type="checkbox" checked={isSelected(record.column0)} onClick={() => onSelect(record.column0)}/>;
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
