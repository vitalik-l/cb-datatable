import React from 'react';
import clsx from 'clsx';

function Pager(props) {
  const { rowsPerPage, page, dataSize, setPage } = props;
  const pagesCount = React.useMemo(() => Math.ceil(dataSize / rowsPerPage), [
    dataSize,
    rowsPerPage,
  ]);
  const pages = React.useMemo(() => Array.from(new Array(pagesCount), (_, index) => index + 1), [
    pagesCount,
  ]);

  if (!pagesCount) return null;

  const goToPage = React.useCallback(
    (page) => {
      if (setPage) setPage(+page);
    },
    [setPage],
  );

  const nextClickHandler = () => {
    goToPage(page + 1);
  };

  const previousClickHandler = () => {
    goToPage(page - 1);
  };

  const selectPageHandler = (e) => {
    e.preventDefault();
    goToPage(e.target.value);
  };

  const styles = {
    previous: {
      visibility: page === 1 ? 'hidden' : 'initial',
    },
    next: {
      visibility: pagesCount === 1 || pagesCount - page === 0 ? 'hidden' : 'initial',
    },
  };

  return (
    <div className="cb-Pager">
      <button
        className={clsx('cb-Pager__previous')}
        style={styles.previous}
        onClick={previousClickHandler}
      >
        Previous
      </button>
      <div className="cb-Pager__select">
        <select onChange={selectPageHandler} value={currentPage}>
          {pages.map((pageNumber) => (
            <option value={pageNumber} key={pageNumber}>
              {pageNumber}
            </option>
          ))}
        </select>
        <span> / {pagesCount}</span>
      </div>
      <button className={clsx('cb-Pager__next')} style={styles.next} onClick={nextClickHandler}>
        Next
      </button>
    </div>
  );
}

export default Pager;
