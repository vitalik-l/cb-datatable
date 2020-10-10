import React from 'react';
import {getDataPerPage} from './utils';

const getArray = (numberTo) => Array.from(new Array(numberTo), (_, index) => index + 1);

function usePagination({data, rowsPerPage}) {
  const [page, setPage] = React.useState(1);
  const dataPerPage =  React.useMemo(() => rowsPerPage ? getDataPerPage(data, page, rowsPerPage) : data, [page, rowsPerPage, data]);
  const numberOfPages = React.useMemo(() => Math.ceil(data.length / rowsPerPage), [data, rowsPerPage]);
  const dataSize = data.length;
  const extraProps = {};

  const range = React.useCallback(() => {
    if (isNaN(page) || numberOfPages === 1) {
      return [];
    }
    const input = [];
    // display page links around the current page
    if (page > 1) {
      input.push(1);
    }
    if (page === 3) {
      input.push(2);
    }
    if (page > 3) {
      input.push('.');
    }
    if (page > 0) {
      input.push(page);
    }
    if (page !== numberOfPages) input.push(page + 1);
    if (page < numberOfPages - 1) {
      input.push(page + 2);
    }
    if (page === numberOfPages - 4) {
      input.push(numberOfPages - 1);
    }
    if (page < numberOfPages - 4) {
      input.push('.');
    }
    if (page < numberOfPages - 2) {
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
    getArray,
    range,
    ...extraProps
  };
}

export default usePagination;
