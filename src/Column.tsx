import React from 'react';
import { TableCellProps } from './TableCell';
import { Paths } from './types';

export type ColumnProps<T> = {
  label?: string;
  value?: any;
  index?: number;
  source?: (T extends object ? Paths<T> : string) | number;
  sortable?: boolean;
  record?: T;
  className?: string;
} & Pick<TableCellProps, 'rowSpan' | 'colSpan' | 'sticky'>;

export type ColumnPropsWithChildren<T> = ColumnProps<T> & {
  children?: React.ReactNode | ((args: ColumnProps<T>) => React.ReactNode);
};

export function Column<T>(props: ColumnPropsWithChildren<T>) {
  const { children, ...restProps } = props;

  if (children) {
    if (typeof children === 'function') {
      return children(restProps);
    }
    return children;
  }

  return <span>{restProps.value}</span>;
}
