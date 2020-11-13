import React from 'react';
import TableCell from './TableCell';
import clsx from 'clsx';

function HeaderCell(props) {
  const {className, setSortBy, sortable, sortBy, label, source, ...restProps} = props;
  const sorting = React.useMemo(() =>
    sortBy && sortBy.length ? sortBy.find(item => item.id === source) || {} : {},
  [sortBy]);
  const { desc, id } = sorting;

  const onClick = React.useMemo(() => {
    if (!sortable) return;
    return () => {
      const newSortBy = [{
        ...sorting,
        id: source,
        desc: !sorting.desc,
      }];
      setSortBy(newSortBy);
    };
  }, [sortable, sorting, sortBy, source]);

  return (
    <TableCell
      onClick={onClick}
      className={clsx(
        className, 'cb-TableHeaderCell', {
        [`cb-TableCell--sort-${desc ? 'desc' : 'asc'}`]: id,
        'cb-TableCell--sortable': sortable
      })}
      isHeader
      {...restProps}
    >
      <div className="cb-HeaderCell">
        {label}
      </div>
    </TableCell>
  );
}

export default HeaderCell;
