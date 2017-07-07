// @flow
// $FlowSkipCheck
import React, {Component} from 'react';
import classNames from 'classnames';
import type {DataT, ColumnT} from './Types';
import TableRow from './TableRow';

type
Props = {
    columns: Array<ColumnT>,
    data: DataT,
	fixedHeader: bool,
	onRowRender: any
};

class TableBody extends Component {
	constructor(props:Props) {
		super(props);
		this.tableBodyNode = null;
		this.table = null;
	}
	componentDidMount() {
		if (this.props.fixedHeader) this.tableBodyNode.addEventListener('scroll', this.scrollHandler);
	}
	scrollHandler = (e:Event) => {
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