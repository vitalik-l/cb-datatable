import React, {Component} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import * as _ from '../utils';

import TableBody from './TableBody';
import TableHeader from './TableHeader';
import Pager from './Pager';

class DataTable extends Component {
    static propTypes = {
        data: PropTypes.array,
        columns: PropTypes.array,
        rowsPerPage: PropTypes.number,
        orderBy: PropTypes.object,
        className: PropTypes.string,
        fixedHeader: PropTypes.bool,
        displayAllData: PropTypes.bool,
        onClick: PropTypes.func,
        onRowRender: PropTypes.func
    };

    static defaultProps = {
        rowsPerPage: 5,
		displayAllData: false,
		displayPager: true,
        firstIndex: 0
    };

    constructor(props) {
        super(props);
        this.state = {
            currentPage: 1,
            orderBy: props.orderBy,
            firstIndex: props.firstIndex
        };

        this.setTableData({
            page: this.state.currentPage,
            orderBy: this.state.orderBy
        });
		this.initPagesArray();
	}

	componentDidMount() {
	    if (this.props.fixedHeader) this.adjustColumnsSize();

        this.container.addEventListener('scroll', this.containerScrollHandler);
    }

    containerScrollHandler = (e) => {
        console.log(e);
    };

    componentWillUpdate(nextProps, nextState) {
    	// console.time('datatable');
        let pageChanged = this.state.currentPage !== nextState.currentPage,
            sortingChanged = this.state.orderBy !== nextState.orderBy;

        if (pageChanged || sortingChanged) {
            this.setTableData({
            	data: nextProps.data,
                page:  pageChanged ? nextState.currentPage : null,
                orderBy: sortingChanged ? nextState.orderBy : this.state.orderBy
            });
			return;
        }

        this.setTableData({data: nextProps.data, orderBy: this.state.orderBy});
		this.initPagesArray(nextProps.data);
	}

	componentDidUpdate() {
        if (this.props.fixedHeader) {
            // debugger;
            this.adjustColumnsSize();
        }
    }

	getPagesCount(data) {
		let _data = data || this.props.data;
        return Math.ceil(_data.length / this.props.rowsPerPage);
    }

    initPagesArray(data) {
    	let _data =  data || this.props.data;
        this.pages = Array.from(new Array(this.getPagesCount(_data)), (val, index) => index + 1);
    }

    setTableData({data, page, orderBy, rowsPerPage, displayAllData = this.props.displayAllData}) {
    	let numberRows = rowsPerPage || this.props.rowsPerPage;
        let toPage = page || this.state.currentPage,
            indexStart = displayAllData ? 0 : (toPage - 1) * numberRows,
            dataToSlice = data || this.props.data;
		if (displayAllData) {
			numberRows = numberRows * toPage;
		}
        if (orderBy) {
            dataToSlice = _.orderBy(dataToSlice, orderBy);
        }
        this.tableData = dataToSlice.slice(indexStart, indexStart + numberRows);
		// console.log('set table data', this.props.data, this.tableData);
    }

    setPage(page) {
        if (page === 0 || page > this.pages.length) return;
        this.setState({currentPage: page});
    }

	selectPageHandler = (e) => {
		e.preventDefault();
		let toPage = e.target.value;
		this.setState({currentPage: +toPage});
	};

    onHeaderAction = (type, params) => {
        switch (type) {
            case 'sort':
                const newSorting = {[params.column.name]: params.orderBy};
                this.setState({orderBy: newSorting});
                break;
            default:
                break;
        }
    };

	bodyScrollHandler = ({target}) => {
		const {scrollLeft} = target;
		if (this.props.fixedHeader) {
			this.tableHeaderComponent.table.style.transform = 'translate3d(' + (-1 * scrollLeft) + 'px, 0, 0)';
		}
		if (this.props.displayAllData) {
			const {scrollTop, offsetHeight, scrollHeight} = target;
			const scrollPosToUpdate = scrollHeight * 0.15;

			if (scrollHeight - (scrollTop + offsetHeight) <= scrollPosToUpdate) {
				this.setPage(this.state.currentPage + 1);
			}
		}
	};

    adjustColumnsSize = () => {
        if (!this.props.fixedHeader) return;
        // this.tableHeaderComponent.table.style.width = this.tableHeaderComponent.fixedContainer.offsetWidth + 'px';
        let headerColumns = this.tableHeaderComponent.row.childNodes;
        // debugger;
        for (let j=0; j < headerColumns.length; j++) {
            let bodyColumn = this.tableBodyComponent.table.childNodes[0].childNodes[j],
                headerColumn = headerColumns[j];
            // clear minWidth
            if (!!bodyColumn.style.width) {
                bodyColumn.style.width = '';
                bodyColumn.style.minWidth = '';
                headerColumn.style.width = '';
            }
            var bodyColumnWidth = bodyColumn.getBoundingClientRect().width,
                headerColumnWidth = headerColumn.getBoundingClientRect().width,
                newWidth = bodyColumnWidth;
            // newWidth = Math.max(bodyColumnWidth, headerColumnWidth);
            headerColumn.style.width = newWidth + 'px';
            if (headerColumn.getBoundingClientRect().width > newWidth) {
                newWidth = Math.max(bodyColumnWidth, headerColumnWidth);
                headerColumn.style.width = newWidth + 'px';
            }
            bodyColumn.style.minWidth = newWidth + 'px';
            bodyColumn.style.width = newWidth + 'px';
        }
        // this.tableHeaderComponent.table.style.width = 'auto';
    };

    previousClickHandler = () => {
        this.setPage(this.state.currentPage - 1);
    };

    nextClickHandler = () => {
        this.setPage(this.state.currentPage + 1);
    };

	loadDataByHeight() {
		if (!this.props.displayAllData) return;
		const bodyTable = this.tableBodyComponent.table;
		const bodyRow = this.tableBodyComponent.table.childNodes[0];
		const tableBodyContainer = this.tableBodyComponent.table;
		const rowHeigh = bodyRow.offsetHeight;
		const tableBodyContainerHeight = tableBodyContainer.offsetHeight;

		if (!bodyRow || !rowHeigh || bodyTable.offsetHeight > tableBodyContainer.offsetHeight) return;

		this.setPage(Math.ceil(Math.ceil(tableBodyContainerHeight/rowHeigh) / this.props.rowsPerPage));
	}

    render() {
        // console.log('DataTable rendered', this.tableData.length, this.props.data.length);
		let pagesCount = this.getPagesCount();
        return (
            <div className={classNames('data-table', this.props.className, {'fixed-header': this.props.fixedHeader})} onClick={this.props.onClick} ref={ref => this.container = ref}>
                <div className="table-container">
                    <div className={classNames({table: !this.props.fixedHeader})}>
                        <TableHeader
                            columns={this.props.columns}
                            orderBy={this.state.orderBy}
                            onAction={this.onHeaderAction}
                            fixedHeader={this.props.fixedHeader}
                            ref={node => this.tableHeaderComponent = node}/>

                        <TableBody
                            data={this.tableData}
                            fixedHeader={this.props.fixedHeader}
                            columns={this.props.columns}
                            onRowRender={this.props.onRowRender}
                            scrollHandler={this.bodyScrollHandler}
                            ref={node => this.tableBodyComponent = node} />
                    </div>
                </div>
                {this.props.displayPager && !this.props.displayAllData ?
					<div className="data-table-pager">
						<button className={classNames('previous', {hidden: this.state.currentPage === 1})} onClick={this.previousClickHandler}>Previous</button>
						<div className="pager">
							<select onChange={this.selectPageHandler} value={this.state.currentPage}>
								{this.pages.map(pageNumber => <option value={pageNumber} key={pageNumber}>{pageNumber}</option>)}
							</select>
							<span> / {pagesCount}</span>
						</div>
						<button className={classNames('next', {hidden: pagesCount === 1 || pagesCount - this.state.currentPage === 0})} onClick={this.nextClickHandler}>Next</button>
					</div>
				: null }
            </div>
        );
    }
}

export default DataTable;