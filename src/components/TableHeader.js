import React, {Component} from 'react';
import classNames from 'classnames';

class TableHeader extends Component {
    constructor(props) {
        super(props);
		this.table = null;
    }

    getSortingValue = column => {
        if (!this.props.orderBy) return null;
        return this.props.orderBy[column.name];
    };

    columnClickHandler = (column, currentSorting) => {
        if (!column.sortable) return;
        let newSorting = currentSorting === 'asc' ? 'desc' : 'asc';
        this.props.onAction('sort', {column: column, orderBy: newSorting});
    };

    render() {
        const {fixedHeader} = this.props;

        const HeaderRow = (
            <div className={classNames('data-table-header', {table: fixedHeader})} ref={node => this.table = node}>
                <div className="table-row" ref={node => this.row = node}>
                    {this.props.columns.map((column,i) => {
                        let sorting = this.getSortingValue(column),
                            sortingSign = '',
                            style = {};
                        if (sorting === 'desc') {
                            sortingSign = '▼';
                        }
                        else if (sorting === 'asc') {
                            sortingSign = '▲';
                        }
                        if (column.minWidth) {
                            style.minWidth = column.minWidth;
                        }
                        return (
                            <div className={classNames('column-header', column.className, {sortable: column.sortable, 'sort-ascending': sorting === 'asc', 'sort-descending': sorting === 'desc'})}
                                 style={style}
                                 onClick={() => {this.columnClickHandler(column, sorting);}}
                                 key={column.name}>
                                {column.label}
                                {' ' + sortingSign}
                            </div>
                        );
                    })}
                </div>
            </div>
        );

        const FixedHeaderRow = (
            <div className="table-header-container" ref={node => this.fixedContainer = node}>
                <div style={{overflow: 'hidden'}}>
                    <div style={{width: 9000}}>
                        {HeaderRow}
                    </div>
                </div>
            </div>
        );

        return fixedHeader ? FixedHeaderRow : HeaderRow;
    }
}

export default TableHeader;