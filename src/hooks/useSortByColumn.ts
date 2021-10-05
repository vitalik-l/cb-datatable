import React from 'react';

// local files
import { SortType, SortBy } from '../types';

type Params = {
  source?: string | number;
  sortable?: boolean;
  multiSort?: boolean;
  sortBy?: Array<SortBy>;
  sortType?: SortType;
  setSortBy?: (arg: Array<SortBy> | SortBy) => void;
};

export const useSortByColumn = ({
  source,
  setSortBy,
  sortable,
  sortBy,
  sortType,
  multiSort,
}: Params) => {
  const sorting: SortBy = React.useMemo(
    () => (sortBy && sortBy.length ? sortBy.find((item) => item.id === source) || {} : {}),
    [sortBy],
  );
  const { desc, id } = sorting;

  const handleSorting = React.useMemo(() => {
    if (!sortable || !setSortBy) return;
    return () => {
      const nextDesc = !id ? true : !desc ? undefined : false;
      const newSortBy =
        typeof nextDesc === 'boolean'
          ? [
              {
                id: source,
                desc: nextDesc,
                sortType,
              },
            ]
          : [];

      setSortBy(
        multiSort && sortBy?.length
          ? [...sortBy.filter((item) => item.id !== source), ...newSortBy]
          : newSortBy,
      );
    };
  }, [sortable, sortBy, source, sortType]);

  return { handleSorting, desc };
};
