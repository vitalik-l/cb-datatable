import React from 'react';
import {getDataPerPage} from './utils';

function usePagination(props) {
  const { data, page, defaultPage = 1, rowsPerPage, dataSize, onChange } = props;
  const { current: isControlled } = React.useRef(page !== undefined);
  const [pageState, setPageState] = React.useState(defaultPage);
  const value = isControlled ? page : pageState;

  const setValueIfUncontrolled = React.useCallback(
    (newValue: number) => {
      if (!isControlled) {
        setPageState(newValue);
      }
    },
    [isControlled],
  );

  const handleChange = (newValue: number) => {
    setValueIfUncontrolled(newValue);

    if (onChange) {
      onChange(newValue);
    }
  };

  const numberOfPages = React.useMemo(() => Math.ceil(dataSize / rowsPerPage), [
    dataSize,
    rowsPerPage,
  ]);

  const range = React.useCallback(() => {
    if (isNaN(value) || numberOfPages === 1) {
      return [];
    }
    const input = [];
    if (value > 2) {
      input.push(1);
    }
    if (value === 4) {
      input.push(2);
    }
    if (value > 4) {
      input.push('.');
    }
    if (value > 1) {
      input.push(value - 1);
    }
    input.push(value);
    if (value < numberOfPages) {
      input.push(value + 1);
    }
    if (value === numberOfPages - 3) {
      input.push(numberOfPages - 1);
    }
    if (value < numberOfPages - 3) {
      input.push('.');
    }
    if (value < numberOfPages - 1) {
      input.push(numberOfPages);
    }

    return input;
  }, [value, numberOfPages]);

  const dataPerPage = React.useMemo(
    () => (rowsPerPage && data ? getDataPerPage(data, value, rowsPerPage) : data),
    [value, rowsPerPage, data],
  );

  let lastRowIndex = value * rowsPerPage;
  const firstRowIndex = lastRowIndex - rowsPerPage + 1;
  lastRowIndex = Math.min(dataSize, lastRowIndex);
  const hasPreviousPage = value > 1;
  const hasNextPage = numberOfPages > 1 && numberOfPages - value !== 0;

  return {
    rowsPerPage,
    page: value,
    setPage: handleChange,
    dataSize,
    firstRowIndex,
    lastRowIndex,
    hasPreviousPage,
    hasNextPage,
    range,
    numberOfPages,
    dataPerPage,
  };
}

export default usePagination;
