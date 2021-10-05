import React from 'react';

// local files
import * as sortTypes from '../utils/sortTypes';
import { SortBy } from '../types';

type useSortByParams = {
  data?: Array<any>;
  sortBy?: Array<SortBy>;
  defaultSortBy?: Array<SortBy>;
  onSort?: (value: Array<SortBy>) => void;
};

export const useSortBy = ({ data, sortBy, defaultSortBy, onSort }: useSortByParams) => {
  const { current: isControlled } = React.useRef(sortBy !== undefined);
  const [sortByState, setSortByState] = React.useState(defaultSortBy);
  const value = isControlled ? sortBy : sortByState;

  const sortedData = React.useMemo(() => (!!data && value ? orderBy(data, value) : data), [
    sortByState,
    data,
  ]);

  const setValueIfUncontrolled = React.useCallback(
    (newValue: any) => {
      if (!isControlled) {
        setSortByState(newValue);
      }
    },
    [isControlled],
  );

  const handleChange = (newValue: any) => {
    setValueIfUncontrolled(newValue);

    if (onSort) {
      onSort(newValue);
    }
  };

  return { sortBy: value, setSortBy: handleChange, sortedData };
};

const orderBy = (data: any, dirs: any = []) => {
  if (!dirs.length) return data;

  return [...data].sort((rowA, rowB) => {
    for (let i = 0; i < dirs.length; i += 1) {
      const sorting = dirs[i];
      const { desc, sortType, id } = sorting;
      const sortFn =
        typeof sortType === 'function' ? sortType : (sortTypes as any)[sortType] || sortTypes.basic;
      const sortInt = sortFn(rowA, rowB, id);
      if (sortInt !== 0) {
        return desc ? -sortInt : sortInt;
      }
    }
  });
};
