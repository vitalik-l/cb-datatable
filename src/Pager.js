import React from 'react';
import clsx from 'clsx';

function Pager(props) {
  const {rowsPerPage, currentPage, dataLength, onChange} = props;
  const pagesCount = React.useMemo(() => Math.ceil(dataLength / rowsPerPage), [dataLength, rowsPerPage]);
  const pages = React.useMemo(() => Array.from(new Array(pagesCount), (_, index) => index + 1), [pagesCount]);

  if (!pagesCount) return;

  const goToPage = React.useCallback((page) => {
    if (onChange) onChange(+page);
  }, [onChange]);

  const nextClickHandler = () => {
    goToPage(currentPage + 1);
  };

  const previousClickHandler = () => {
    goToPage(currentPage - 1);
  };

  const selectPageHandler = (e) => {
    e.preventDefault();
    goToPage(e.target.value);
  };

  const styles = {
    previous: {
      visibility: currentPage === 1 ? 'hidden' : 'initial'
    },
    next: {
      visibility: pagesCount === 1 || pagesCount - currentPage === 0 ? 'hidden' : 'initial'
    }
  };

  return (
    <div className="cb-Pager">
      <button className={clsx('cb-Pager__previous')} style={styles.previous} onClick={previousClickHandler}>Previous</button>
      <div className="cb-Pager__select">
        <select onChange={selectPageHandler} value={currentPage}>
          {pages.map(pageNumber => <option value={pageNumber} key={pageNumber}>{pageNumber}</option>)}
        </select>
        <span> / {pagesCount}</span>
      </div>
      <button className={clsx('cb-Pager__next')} style={styles.next} onClick={nextClickHandler}>Next</button>
    </div>
  )
}

export default Pager;
