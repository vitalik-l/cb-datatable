import clsx from 'clsx';
import React from 'react';
import { TableCell } from './TableCell';
import { OnRowClick } from './types';
import { get } from './utils/get';
import { mapChildren } from './utils/mapChildren';

export type TableRowProps<T = {}> = {
  cell?: React.ReactElement;
  record?: T;
  index?: number;
  useDiv?: boolean;
  onClick?: OnRowClick;
  ref?: any;
  columnProps?: any;
} & React.HTMLAttributes<HTMLTableRowElement>;

export const TableRow = React.forwardRef(function TableRow<T>(props: TableRowProps<T>, ref: any) {
  const {
    children,
    cell,
    className,
    record,
    index,
    onClick,
    useDiv,
    columnProps,
    ...restProps
  } = props;

  const handleClick = React.useMemo(() => {
    if (!onClick) return;
    return (event: React.MouseEvent<HTMLTableRowElement>) => {
      onClick(event, record, index);
    };
  }, [onClick]);

  const Component = useDiv ? 'div' : 'tr';

  return (
    <Component
      className={clsx('cb-TableRow', className)}
      onClick={handleClick}
      ref={ref}
      {...restProps}
    >
      {!!cell &&
        mapChildren(children, (child: any, childIndex) => {
          const source = child.props.source;
          const value = source ? get(record, source) : undefined;

          return React.cloneElement(
            cell,
            { key: childIndex, useDiv, ...child.props },
            React.cloneElement(child, { record, index, value, ...columnProps }),
          );
        })}
    </Component>
  );
});

TableRow.defaultProps = {
  cell: <TableCell />,
};
