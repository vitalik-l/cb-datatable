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
  const pager = usePagination({data: sortedData, rowsPerPage});
  const { dataPerPage, page } = pager;

  React.useEffect(() => {
    setSelected([]);
  }, [page]);

  const isSelected = (name) => selected.indexOf(name) !== -1;

  const onSelect = (name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
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
    setSelected(Array.from(new Array(dataPerPage.length), (_, index) => index + 1));
  };

  return (
    <div className="cb-DataTable">
      {!!selected.length && <div>selected {selected.length}</div>}
      <Table data={dataPerPage} headerCell={<HeaderCell sortable={sortable} {...otherSortingProps} />} {...tableProps}>
        {selectable && (
          <Column label={<input type="checkbox" onClick={onSelectAll} checked={selected.length === dataPerPage.length} />} sortable={false}>
            {({index}) => {
              return <input type="checkbox" checked={isSelected(index)} onClick={() => onSelect(index)}/>;
            }}
          </Column>
        )}
        {children}
      </Table>
      {!!rowsPerPage && <PageNumbers {...pager} />}
    </div>
  )
}

export default DataTable;
