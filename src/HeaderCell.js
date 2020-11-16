import React from 'react';
import TableCell from './TableCell';
import clsx from 'clsx';

function HeaderCell(props) {
  const {
    className,
    setSortBy,
    sortable,
    sortBy,
    sortType,
    label,
    source,
    multiSort,
    ...restProps
  } = props;
  const sorting = React.useMemo(
    () => (sortBy && sortBy.length ? sortBy.find((item) => item.id === source) || {} : {}),
    [sortBy],
  );
  const { desc, id } = sorting;

  const onClick = React.useMemo(() => {
    if (!sortable) return;
    return () => {
      const { desc, id } = sorting;
      const nextDesc = !id ? true : !desc ? undefined : false;
      const newSortBy =
        typeof nextDesc === 'boolean'
          ? [
              {
                ...sorting,
                id: source,
                desc: nextDesc,
                sortType,
              },
            ]
          : [];

      setSortBy(
        multiSort && sortBy?.length
          ? [...sortBy.filter((item) => item.id !== source), ...newSortBy]
          : newSortBy,
      );
    };
  }, [sortable, sorting, sortBy, source, sortType]);

  return (
    <TableCell
      onClick={onClick}
      className={clsx(className, 'cb-TableHeaderCell', {
        [`cb-TableCell--sort-${desc ? 'desc' : 'asc'}`]: id,
        'cb-TableCell--sortable': sortable,
      })}
      isHeader
      {...restProps}
    >
      <div className="cb-HeaderCell">{label}</div>
    </TableCell>
  );
}

export default HeaderCell;
