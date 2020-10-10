import React from 'react';
import {sortData} from './utils';

function useSortBy({data, defaultSortBy}) {
  const [sortByState, setSortBy] = React.useState(defaultSortBy);
  const sortedData = React.useMemo(() => sortByState ? sortData(data, sortByState) : data, [sortByState, data]);

  return {sortBy: sortByState, setSortBy, sortedData};
}

export default useSortBy;
