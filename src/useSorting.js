import React from 'react';
import {sortData} from './utils';

function useSorting({orderBy, onSort, data}) {
  const [order, setOrder] = React.useState(orderBy);
  const sortedData = React.useMemo(() => order && !onSort ? sortData(data, order) : data, [order, data]);

  React.useEffect(() => {
    if (onSort) onSort(order);
  }, [order]);

  return {order, setOrder, sortedData};
}

export default useSorting;
