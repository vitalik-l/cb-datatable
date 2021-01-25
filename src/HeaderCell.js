import React from 'react';
import clsx from 'clsx';

// local files
import TableCell from './TableCell';
import useSortByColumn from './useSortByColumn';
import ColumnPropsContext from './ColumnPropsContext';

function HeaderCell(props) {
  const {
    className,
    setSortBy,
    sortable,
    sortBy,
    sortType,
    multiSort,
    sortIconAsc,
    sortIconDesc,
    label,
    source,
    ...restProps
  } = props;
  const { handleSorting, desc } = useSortByColumn({
    source,
    setSortBy,
    sortable,
    sortBy,
    sortType,
    multiSort,
  });
  const sortIcon = desc ? sortIconDesc : sortIconAsc;

  return (
    <ColumnPropsContext.Provider
      value={{
        handleSorting,
        desc,
        source,
        sortable,
        ...restProps,
      }}
    >
      <TableCell
        onClick={handleSorting}
        className={clsx(className, 'cb-TableHeaderCell', {
          [`cb-TableCell--sort-${desc ? 'desc' : 'asc'}`]: typeof desc === 'boolean',
          'cb-TableCell--sortable': sortable,
        })}
        isHeader
        {...restProps}
      >
        <div className="cb-HeaderCell">
          <div className="cb-HeaderCell__label">{label}</div>
          {!!sortIcon && <div className="cb-HeaderCell__icon">{sortIcon}</div>}
        </div>
      </TableCell>
    </ColumnPropsContext.Provider>
  );
}

export default HeaderCell;
