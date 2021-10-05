import React from 'react';

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
