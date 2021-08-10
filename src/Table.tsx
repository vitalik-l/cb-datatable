import React from 'react';
import clsx from 'clsx';

// local files
import { TableHeader } from './TableHeader';
import { TableBody } from './TableBody';
import { TableRow } from './TableRow';
import { HeaderCell } from './HeaderCell';
import { onRowClickType } from './types';

type Props = React.ComponentProps<'table'> & {
  /** Make the header to be sticky */
  stickyHeader?: boolean;
  /** Make rows striped */
  striped?: boolean;
  rowHover?: boolean;
  useDiv?: boolean;
  onRowClick?: onRowClickType;
  row?: React.ReactElement;
  headerCell?: React.ReactElement;
  header?: React.ReactElement;
  body?: React.ReactElement;
  data?: Array<any>;
};

export const Table = (props: Props) => {
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
  data: [],
};
