import React, {Component} from 'react';
import classNames from 'classnames';

class Pager extends Component {
    selectPageHandler = e => {
        e.preventDefault();
        let toPage = e.target.value;
        this.props.selectPageHandler && this.props.selectPageHandler(toPage);
    };
    previousClickHandler = () => {
        this.props.selectPageHandler && this.props.selectPageHandler('previous');
    };
    nextClickHandler = () => {
        this.props.selectPageHandler && this.props.selectPageHandler('next');
    };
    render() {
        const {currentPage, pagesCount, pages} = this.props;
        return (
            <div className="data-table-pager">
                <button className={classNames('previous', {hidden: currentPage === 1})} onClick={this.previousClickHandler}>Previous</button>
                <div className="pager">
                    <select onChange={this.selectPageHandler} value={currentPage}>
                        {pages.map(pageNumber => <option value={pageNumber} key={pageNumber}>{pageNumber}</option>)}
                    </select>
                    <span> / {pagesCount}</span>
                </div>
                <button className={classNames('next', {hidden: pagesCount === 1 || pagesCount - currentPage === 0})} onClick={this.nextClickHandler}>Next</button>
            </div>
        )
    }
}

export default Pager;