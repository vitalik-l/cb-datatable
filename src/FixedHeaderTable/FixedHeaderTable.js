import React from 'react';
import TableHeader from '../TableHeader';
import TableBody from '../TableBody';
import FixedHeaderHelper from './FixedHeaderHelper';

class FixedHeaderTable extends React.Component {
    componentDidMount() {
        this.fixedHeaderHelper = new FixedHeaderHelper({
            tableBodyContainer: this.tableBodyContainer,
            tableBody: this.tableBody,
            tableHeaderContainer: this.tableHeaderContainer,
            tableHeader: this.tableHeader
        });
    }

    componentDidUpdate() {
        this.fixedHeaderHelper.adjustHeader();
    }

    render() {
        return (
            <div className="fixed-header-table">
                <div className="fixed-header-table__header" ref={el => this.tableHeaderContainer = el}>
                    <table ref={el => this.tableHeader = el}>
                        <TableHeader orderBy={this.props.orderBy} setOrderBy={this.props.setOrderBy} columns={this.props.columns} />
                    </table>
                </div>
                <div className="fixed-header-table__body" ref={el => this.tableBodyContainer = el}>
                    <table ref={el => this.tableBody = el}>
                        <TableBody BodyRowRenderer={this.props.BodyRowRenderer} columns={this.props.columns} data={this.props.displayData} />
                    </table>
                </div>
            </div>
        );
    }
}

export default FixedHeaderTable;
