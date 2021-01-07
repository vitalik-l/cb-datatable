import React from 'react';

function PageNumbers(props) {
  const { page, rowsPerPage, dataSize, setPage } = props;
  const numberOfPages = React.useMemo(() => Math.ceil(dataSize / rowsPerPage), [
    dataSize,
    rowsPerPage,
  ]);
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

  let lastRowIndex = page * rowsPerPage;
  const firstRowIndex = lastRowIndex - rowsPerPage + 1;
  lastRowIndex = Math.min(dataSize, lastRowIndex);
  const hasPreviousPage = page > 1;
  const hasNextPage = numberOfPages > 1 && numberOfPages - page !== 0;
  const displayButtons = numberOfPages > 1;

  return (
    <div>
      <span>
        {firstRowIndex} - {lastRowIndex} of {dataSize}
      </span>
      {displayButtons && (
        <div>
          {hasPreviousPage && <button onClick={() => setPage(page - 1)}>Back</button>}
          {range().map((pageNum, index) => {
            return pageNum === '.' ? (
              <span key={`hyphen_${index}`}>&hellip;</span>
            ) : (
              <button onClick={() => setPage(pageNum)} disabled={page === pageNum} key={pageNum}>
                {pageNum}
              </button>
            );
          })}
          {hasNextPage && <button onClick={() => setPage(page + 1)}>Next</button>}
        </div>
      )}
    </div>
  );
}

export default PageNumbers;
