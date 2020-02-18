// @flow
import React from 'react';
import clsx from 'clsx';

type Props = {
  data: Array<Object>,
  rowsPerPage: number,
  currentPage: number,
  setCurrentPage?: Function
};

class Pager extends React.Component<Props> {
  props: Props;

  static defaultProps = {
    rowsPerPage: 20,
    currentPage: 1
  };

  get pagesCount(): number {
    return Math.ceil(this.props.data.length / this.props.rowsPerPage);
  }

  get pages(): Array<number> {
    return Array.from(new Array(this.pagesCount), (val, index) => index + 1);
  }

  goToPage(toPage: number) {
    this.props.setCurrentPage && this.props.setCurrentPage(+toPage);
  }

  nextClickHandler = () => {
    this.goToPage(this.props.currentPage + 1);
  };

  previousClickHandler = () => {
    this.goToPage(this.props.currentPage - 1);
  };

  selectPageHandler = (e: SyntheticInputEvent<*>) => {
    e.preventDefault();
    this.goToPage(+e.target.value);
  };

  render() {
    if (!this.pagesCount) return null;

    const currentPage = this.props.currentPage;
    const pagesCount = this.pagesCount;
    const pages = this.pages;
    const styles = {
      previous: {
        visibility: currentPage === 1 ? 'hidden' : 'initial'
      },
      next: {
        visibility: pagesCount === 1 || pagesCount - currentPage === 0 ? 'hidden' : 'initial'
      }
    };

    return (
      <div className="cb-datatable-pager">
        <button className={clsx('cb-datatable-pager__previous')} style={styles.previous} onClick={this.previousClickHandler}>Previous</button>
        <div className="cb-datatable-pager__select">
          <select onChange={this.selectPageHandler} value={currentPage}>
            {pages.map(pageNumber => <option value={pageNumber} key={pageNumber}>{pageNumber}</option>)}
          </select>
          <span> / {pagesCount}</span>
        </div>
        <button className={clsx('cb-datatable-pager__next')} style={styles.next} onClick={this.nextClickHandler}>Next</button>
      </div>
    )
  }
}

export default Pager;
