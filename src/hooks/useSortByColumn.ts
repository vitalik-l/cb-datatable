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
  if (process.env.NODE_ENV !== 'production') {
    React.useEffect(() => {
      if (sortable && !source) {
        console.error(
          'A column has the "sortable" prop without the "source" prop. Define the "source" prop to make the sorting working for this column',
        );
      }
    }, [sortable, source]);
  }

  const sorting: SortBy = React.useMemo(
    () => (sortBy && sortBy.length ? sortBy.find((item) => item.id === source) || {} : {}),
    [sortBy],
  );
  const { desc, id } = sorting;

  const handleSorting = React.useMemo(() => {
    if (!sortable || !setSortBy || !source) return;
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
  }, [sortable, sortBy, source, sortType, setSortBy]);

  return { handleSorting, desc };
};
