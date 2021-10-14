import clsx from 'clsx';
import React from 'react';
import { TableCell } from './TableCell';
import { TableRow } from './TableRow';
import { onRowClickType } from './types';

type Props = React.ComponentProps<'tbody'> & {
  useDiv?: boolean;
  row?: React.ReactElement;
  cell?: React.ReactElement;
  data?: any;
  currentIndex?: number;
  onRowClick?: onRowClickType;
  striped?: boolean;
  rowHover?: boolean;
};

export const TableBody = React.forwardRef((props: Props, ref: any) => {
  const {
    row,
    data,
    currentIndex = 0,
    onRowClick,
    children,
    striped,
    rowHover,
    className,
    useDiv,
    cell,
    ...restProps
  } = props;

  const Component = useDiv ? 'div' : 'tbody';

  return (
    <Component
      className={clsx('cb-TableBody', className, { 'cb-TableBody_rowHover': rowHover })}
      ref={ref}
      {...restProps}
    >
      {!!row &&
        data.map((record: any, recordIndex: number) => {
          const index = recordIndex + currentIndex;
          let oddEvenClassName;

          if (striped) {
            oddEvenClassName = index % 2 > 0 ? 'cb-TableRow_odd' : 'cb-TableRow_even';
          }

          return React.cloneElement(
            row,
            {
              className: oddEvenClassName,
              onClick: onRowClick,
              record,
              index,
              useDiv,
              cell,
              key: index,
            },
            children,
          );
        })}
    </Component>
  );
});

TableBody.defaultProps = {
  data: [],
  currentIndex: 0,
  row: <TableRow />,
  cell: <TableCell />,
};