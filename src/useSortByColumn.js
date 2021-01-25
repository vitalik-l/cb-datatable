import React from 'react';

const useSortByColumn = ({
  source,
  setSortBy,
  sortable,
  sortBy,
  sortType,
  multiSort,
}) => {
  const sorting = React.useMemo(
    () => (sortBy && sortBy.length ? sortBy.find((item) => item.id === source) || {} : {}),
    [sortBy],
  );
  const { desc, id } = sorting;

  const handleSorting = React.useMemo(() => {
    if (!sortable) return;
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

export default useSortByColumn;
