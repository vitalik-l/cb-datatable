import React, {Component} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import TableRow from './TableRow';

class TableBody extends Component {
	static propTypes = {
		columns: PropTypes.array,
		data: PropTypes.array,
		fixedHeader: PropTypes.bool,
		onRowRender: PropTypes.func
	};

	constructor(props) {
		super(props);
		this.tableBodyNode = null;
		this.table = null;
	}

	componentDidMount() {
		if (this.props.fixedHeader) this.tableBodyNode.addEventListener('scroll', this.scrollHandler);
	}

	scrollHandler = (e) => {
		this.props.scrollHandler && this.props.scrollHandler(e);
	};

	render() {
		const {columns, data, fixedHeader, onRowRender} = this.props;
		const style = {};
		if (fixedHeader) {
			style.overflow = 'auto';
			style.willChange = 'transform';
		}
		// <div className="table-body-container" style={style} ref={node => this.tableBodyNode = node}>

		const Table = (
			<div className={classNames("data-table-body", {table: fixedHeader})} ref={node => this.table = node}>
				{data.map((row, i) => {
					return (
						<TableRow columns={columns} row={row} onRowRender={onRowRender} key={i}/>
					);
				})}
			</div>
		);

		const FixedTable = (
			<div className="table-body-container" style={style} ref={node => this.tableBodyNode = node}>
				{Table}
			</div>
		);

		return fixedHeader ? FixedTable : Table;
	}
}

export default TableBody;