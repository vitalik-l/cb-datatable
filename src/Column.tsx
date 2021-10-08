import React from 'react';
import { Paths } from './types';

export type ColumnProps<T> = {
  label?: string;
  value?: any;
  index?: number;
  source?: (T extends object ? Paths<T> : string) | number;
  record?: T;
  className?: string;
  colSpan?: number;
  rowSpan?: number;
};

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
