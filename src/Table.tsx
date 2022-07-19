import clsx from 'clsx';
import React from 'react';
import { HeaderCell } from './HeaderCell';
import { TableBody } from './TableBody';
import { TableCell } from './TableCell';
import { TableHeader } from './TableHeader';
import { TableRow } from './TableRow';
import { OnRowClick } from './types';

export type TableProps = React.ComponentProps<'table'> & {
  /** Make the header to be sticky */
  stickyHeader?: boolean;
  /** Make rows striped */
  striped?: boolean;
  rowHover?: boolean;
  useDiv?: boolean;
  onRowClick?: OnRowClick;
  row?: React.ReactElement;
  cell?: React.ReactElement;
  headerCell?: React.ReactElement;
  header?: React.ReactElement | null | false;
  body?: React.ReactElement;
  data?: Array<any>;
};

export const Table = (props: TableProps) => {
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
    cell,
  } = props;

  const Component = useDiv ? 'div' : 'table';

  return (
    <Component
      className={clsx('cb-Table', className, { 'cb-Table_sticky': stickyHeader })}
      onClick={onClick}
    >
      {!!header &&
        React.cloneElement(
          header,
          {
            headerCell,
            useDiv,
          },
          children,
        )}
      {!!body &&
        React.cloneElement(
          body,
          {
            striped,
            data,
            rowHover,
            onRowClick,
            row,
            cell,
            useDiv,
          },
          children,
        )}
    </Component>
  );
};

Table.defaultProps = {
  header: <TableHeader />,
  body: <TableBody />,
  row: <TableRow />,
  headerCell: <HeaderCell />,
  cell: <TableCell />,
  data: [],
};
