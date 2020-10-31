import React from 'react';
import clsx from 'clsx';
import TableHeader from './TableHeader';
import TableBody from './TableBody';

function Table(props) {
  const {
    data,
    children,
    className,
    stickyHeader,
    striped,
    rowHover,
    onClick,
    onRowClick,
    row,
    headerCell,
    header,
    body,
  } = props;

  return (
    <table className={clsx('cb-Table', className, {'cb-Table--sticky-header': stickyHeader})} onClick={onClick}>
      {!!header &&
        React.cloneElement(header, {
          headerCell,
        }, children)
      }
      {
        React.cloneElement(body, {
          striped,
          data,
          rowHover,
          onRowClick,
          row,
        }, children)
      }
    </table>
  )
}

Table.defaultProps = {
  header: <TableHeader />,
  body: <TableBody />
};

export default Table;
