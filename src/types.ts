import React from 'react';

type Join<K, P> = K extends string | number
  ? P extends string | number
    ? `${K}${'' extends P ? '' : '.'}${P}`
    : never
  : never;

type Prev = [never, 0, 1, 2, 3, 4, ...0[]];

export type Paths<T, D extends number = 5> = [D] extends [never]
  ? never
  : T extends Date
  ? ''
  : T extends object
  ? {
      [K in keyof T]-?: K extends string | number ? `${K}` | Join<K, Paths<T[K], Prev[D]>> : never;
    }[keyof T]
  : '';

export type OnRowClick = (
  event: React.MouseEvent<HTMLTableRowElement>,
  record: any,
  index?: number,
) => void;

export type SortType = (...args: any) => any | string;

export type SortBy = {
  id?: string | number;
  desc?: boolean;
  sortType?: SortType;
};
