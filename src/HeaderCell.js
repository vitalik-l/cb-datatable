import React from 'react';
import TableCell from './TableCell';
import clsx from 'clsx';

function HeaderCell(props) {
  const {className, setSortBy, sortable, sortBy, label, source, ...restProps} = props;
  const sorting = sortBy ? sortBy[source] : '';

  const onClick = React.useMemo(() => {
    if (!sortable) return;
    return () => {
      let newSorting = sorting === 'asc' ? 'desc' : 'asc';
      setSortBy({[source]: newSorting});
    };
  }, [sortable, sorting]);

  return (
    <TableCell
      onClick={onClick}
      className={clsx(
        className, 'cb-TableHeaderCell', {
        [`cb-TableCell--sort-${sorting}`]: sorting,
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
