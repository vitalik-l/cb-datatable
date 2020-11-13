import React from 'react';
import * as sortTypes from './utils/sortTypes';

function useSortBy({data, sortBy}) {
  const [sortByState, setSortBy] = React.useState(sortBy);
  const sortedData = React.useMemo(() => sortByState ? orderBy(data, sortByState) : data, [sortByState, data]);

  React.useEffect(() => {
    setSortBy(sortBy);
  }, [sortBy]);

  return {sortBy: sortByState, setSortBy, sortedData};
}

const orderBy = (data: any, dirs: any = []) => {
  if (!dirs.length) return data;

  return [...data].sort((rowA, rowB) => {
    for (let i = 0; i < dirs.length; i += 1) {
      const sorting = dirs[i];
      const { desc, sortType, id } = sorting;
      const sortFn = sortTypes[sortType] || sortTypes.basic;
      const sortInt = sortFn(rowA, rowB, id);
      if (sortInt !== 0) {
        return desc ? -sortInt : sortInt
      }
    }
  });
};

export default useSortBy;
