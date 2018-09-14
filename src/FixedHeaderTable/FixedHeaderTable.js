// @flow
import React from 'react';
import TableHeader from '../TableHeader';
import TableBody from '../TableBody';
import FixedHeaderHelper from './FixedHeaderHelper';
import type {TableProps} from '../types';

class FixedHeaderTable extends React.Component<TableProps> {
  props: TableProps;
  fixedHeaderHelper: FixedHeaderHelper;
  tableContainer: HTMLElement;
  tableBodyContainer: ?HTMLElement;
  tableBody: ?HTMLElement;
  tableHeaderContainer: ?HTMLElement;
  tableHeader: ?HTMLElement;

  componentDidMount() {
    this.fixedHeaderHelper = new FixedHeaderHelper({
      tableContainer: this.tableContainer,
      tableBodyContainer: this.tableBodyContainer,
      tableBody: this.tableBody,
      tableHeaderContainer: this.tableHeaderContainer,
      tableHeader: this.tableHeader
    });
  }

  componentDidUpdate() {
    this.fixedHeaderHelper.adjustColumns();
  }

  get Header(): React$Element<*> {
    return (
      <div className="fixed-header-table__header" ref={el => this.tableHeaderContainer = el}>
        <table ref={el => this.tableHeader = el}>
          <TableHeader orderBy={this.props.orderBy} setOrderBy={this.props.setOrderBy} columns={this.props.columns} />
        </table>
      </div>
    )
  }

  get Body(): React$Element<*> {
    return (
      <div className="fixed-header-table__body" ref={el => this.tableBodyContainer = el}>
        <table ref={el => this.tableBody = el}>
          <TableBody
            BodyRowRenderer={this.props.BodyRowRenderer}
            columns={this.props.columns}
            data={this.props.displayData}
            onRowClick={this.props.onRowClick}
          />
        </table>
      </div>
    )
  }

  get Loader(): ?React$Element<*> {
    if (!this.props.loading) return;
    return this.props.Loader;
  }

  renderLayout() {
    return (
      <div className="fixed-header-table">
        {this.Header}
        {this.Loader}
        {this.Body}
      </div>
    )
  }

  render() {
    return (
      <span className="cb-datatable__table" ref={el => this.tableContainer = el}>
        {this.props.renderTableLayout ?
        this.props.renderTableLayout({Body: this.Body, Header: this.Header, Loader: this.Loader})
        : this.renderLayout()}
      </span>
    )
  }
}

export default FixedHeaderTable;
