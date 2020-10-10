import React from 'react';
import TableCell from './TableCell';
import clsx from 'clsx';

function HeaderCell(props) {
  const {onHeaderClick, className, setSortBy, sortable, sortBy, label, source, ...restProps} = props;
  const sorting = sortBy ? sortBy[source] : '';

  const onClick = React.useMemo(() => {
    if (onHeaderClick) return onHeaderClick;
    if (!sortable) return;
    return (e) => {
      if (onHeaderClick) {
        onHeaderClick(e);
        return;
      }
      let newSorting = sorting === 'asc' ? 'desc' : 'asc';
      setSortBy({[source]: newSorting});
    };
  }, [onHeaderClick, sortable, sorting]);

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
