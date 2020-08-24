import React from 'react';
import TableCell from './TableCell';
import clsx from 'clsx';

function HeaderCell(props) {
  const {onHeaderClick, setOrder, sortable, orderBy, label, source} = props;
  const sorting = orderBy ? orderBy[source] : '';

  const onClick = React.useCallback((e) => {
    if (onHeaderClick) {
      onHeaderClick(e);
      return;
    }
    if (!sortable) return;
    let newSorting = sorting === 'asc' ? 'desc' : 'asc';
    setOrder({[source]: newSorting});
  }, [onHeaderClick, sortable, sorting]);

  return (
    <TableCell
      onClick={onClick}
      className={clsx({
        [`cb-TableCell--sort-${sorting}`]: sorting,
        'cb-TableCell--sortable': sortable
      })}
    >
      <div className="cb-HeaderCell">
        {label}
      </div>
    </TableCell>
  );
}

export default HeaderCell;
