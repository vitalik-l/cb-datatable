import React from 'react';
import { getDataPerPage } from './utils';

function usePagination({ data, rowsPerPage, resetOnDataChange = true }) {
  const [page, setPage] = React.useState(1);
  const dataPerPage = React.useMemo(
    () => (rowsPerPage ? getDataPerPage(data, page, rowsPerPage) : data),
    [page, rowsPerPage, data],
  );
  const numberOfPages = React.useMemo(() => Math.ceil(data.length / rowsPerPage), [
    data,
    rowsPerPage,
  ]);
  const dataSize = data.length;
  const extraProps = {};

  React.useEffect(() => {
    if (resetOnDataChange) {
      setPage(1);
    }
  }, [data]);

  const range = React.useCallback(() => {
    if (isNaN(page) || numberOfPages === 1) {
      return [];
    }
    const input = [];
    // display page links around the current page
    if (page > 2) {
      input.push(1);
    }
    if (page === 4) {
      input.push(2);
    }
    if (page > 4) {
      input.push('.');
    }
    if (page > 1) {
      input.push(page - 1);
    }
    input.push(page);
    if (page < numberOfPages) {
      input.push(page + 1);
    }
    if (page === numberOfPages - 3) {
      input.push(numberOfPages - 1);
    }
    if (page < numberOfPages - 3) {
      input.push('.');
    }
    if (page < numberOfPages - 1) {
      input.push(numberOfPages);
    }

    return input;
  }, [page, numberOfPages]);

  if (rowsPerPage) {
    const lastRowIndex = page * rowsPerPage;
    extraProps.firstRowIndex = lastRowIndex - rowsPerPage + 1;
    extraProps.lastRowIndex = Math.min(dataSize, lastRowIndex);
    extraProps.hasPreviousPage = page > 1;
    extraProps.hasNextPage = numberOfPages > 1 && numberOfPages - page !== 0;
  }

  return {
    rowsPerPage,
    dataPerPage,
    page,
    setPage,
    dataSize,
    numberOfPages,
    range,
    ...extraProps,
  };
}

export default usePagination;
