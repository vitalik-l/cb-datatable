import React, {Component} from 'react';
import classNames from 'classnames';

class TableRow extends Component {
	constructor(props) {
		super(props);
		this.tableRowNode = null;
	}

	componentDidMount() {
		this.props.onRowRender && this.props.onRowRender(this.tableRowNode, this.props.row);
	}

	componentDidUpdate() {
		this.props.onRowRender && this.props.onRowRender(this.tableRowNode, this.props.row);
	}

	render() {
		return (
			<div className="table-row" ref={node => this.tableRowNode = node}>
				{this.props.columns.map((column, i) => {
					let style = {};
					if (column.minWidth) style.minWidth = column.minWidth;
					return (
						<div className={classNames('table-cell', column.className)} style={style} key={i}>
							<div className={classNames('table-cell-content')}>
									{column.renderer
										?
										React.createElement(column.renderer, {column, row: this.props.row, rowNode: this.tableRowNode})
										:
										this.props.row[column.name]}
							</div>
						</div>
					);
				})}
			</div>
		);
	}
}

export default TableRow;