import React from 'react';
import { getDataPerPage } from './utils';

function usePagination({ data, dataSize = data?.length, rowsPerPage, resetOnDataChange = true }) {
  const [page, setPage] = React.useState(1);
  const dataPerPage = React.useMemo(
    () => (rowsPerPage && data ? getDataPerPage(data, page, rowsPerPage) : data),
    [page, rowsPerPage, data],
  );

  React.useEffect(() => {
    if (resetOnDataChange) {
      setPage(1);
    }
  }, [data]);

  return {
    rowsPerPage,
    dataPerPage,
    page,
    setPage,
    dataSize,
  };
}

export default usePagination;
