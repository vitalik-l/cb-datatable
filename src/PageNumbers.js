import React from 'react';

function PageNumbers(props) {
  const {
    page,
    dataSize,
    setPage,
    firstRowIndex,
    lastRowIndex,
    hasNextPage,
    hasPreviousPage,
    numberOfPages,
    range,
  } = props;
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
