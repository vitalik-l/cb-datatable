import React from 'react';

type Join<K, P> = K extends string | number
  ? P extends string | number
    ? `${K}${'' extends P ? '' : '.'}${P}`
    : never
  : never;

type Prev = [never, 0, 1, 2, 3, 4, ...0[]];

export type Leaves<T, D extends number = 5> = [D] extends [never]
  ? never
  : T extends object
  ? { [K in keyof T]-?: Join<K, Leaves<T[K], Prev[D]>> }[keyof T]
  : '';

export type onRowClickType = (
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
