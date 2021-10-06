import clsx from 'clsx';
import React from 'react';
import { TableCell } from './TableCell';
import { onRowClickType } from './types';
import { get } from './utils/get';
import { mapChildren } from './utils/mapChildren';

type Props = {
  cell?: React.ReactElement;
  record?: any;
  index?: number;
  useDiv?: boolean;
  onClick?: onRowClickType;
} & React.ComponentProps<'tr'>;

export const TableRow = React.forwardRef((props: Props, ref: any) => {
  const { children, cell, className, record, index, onClick, useDiv, ...restProps } = props;

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
            React.cloneElement(child, { record, index, value }),
          );
        })}
    </Component>
  );
});

TableRow.defaultProps = {
  cell: <TableCell />,
};
