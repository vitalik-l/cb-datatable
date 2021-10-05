import React from 'react';
import clsx from 'clsx';

// local files
import { TableCell } from './TableCell';
import { useSortByColumn } from './hooks/useSortByColumn';
import { ColumnPropsContext } from './ColumnPropsContext';

type Props = React.ComponentProps<typeof TableCell> &
  Parameters<typeof useSortByColumn>[0] & {
    sortIconAsc?: React.ReactElement;
    sortIconDesc?: React.ReactElement;
    label?: React.ReactNode;
  };

export const HeaderCell = React.forwardRef((props: Props, ref: any) => {
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
  const sortIcon = desc === true ? sortIconDesc : desc === false ? sortIconAsc : undefined;

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
        className={clsx(className, 'cb-HeaderCell', {
          [`cb-HeaderCell_sort_${desc ? 'desc' : 'asc'}`]: typeof desc === 'boolean',
          'cb-HeaderCell_sortable': sortable,
        })}
        isHeader
        ref={ref}
        {...restProps}
      >
        <div className="cb-HeaderCellContent">
          <div className="cb-HeaderCellContent__label">{label}</div>
          {!!sortIcon && <div className="cb-HeaderCellContent__icon">{sortIcon}</div>}
        </div>
      </TableCell>
    </ColumnPropsContext.Provider>
  );
});
