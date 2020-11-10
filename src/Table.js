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
    useDiv,
  } = props;

  const Component = useDiv ? 'div' : 'table';

  return (
    <Component className={clsx('cb-Table', className, {'cb-Table--sticky-header': stickyHeader})} onClick={onClick}>
      {!!header &&
        React.cloneElement(header, {
          headerCell,
          useDiv,
        }, children)
      }
      {
        React.cloneElement(body, {
          striped,
          data,
          rowHover,
          onRowClick,
          row,
          useDiv,
        }, children)
      }
    </Component>
  )
}

Table.defaultProps = {
  header: <TableHeader />,
  body: <TableBody />
};

export default Table;
