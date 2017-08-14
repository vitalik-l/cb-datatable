// @flow
import React from 'react';
import TableHeader from '../TableHeader';
import TableBody from '../TableBody';
import FixedHeaderHelper from './FixedHeaderHelper';
import type {TableProps} from '../types';

class FixedHeaderTable extends React.Component {
  props: TableProps;
  fixedHeaderHelper: FixedHeaderHelper;
  tableBodyContainer: Element;
  tableBody: Element;
  tableHeaderContainer: Element;
  tableHeader: Element;

  componentDidMount() {
    this.fixedHeaderHelper = new FixedHeaderHelper({
      tableBodyContainer: this.tableBodyContainer,
      tableBody: this.tableBody,
      tableHeaderContainer: this.tableHeaderContainer,
      tableHeader: this.tableHeader
    });
  }

  componentDidUpdate() {
    this.fixedHeaderHelper.adjustColumns();
  }

  get Header() {
    return (
      <div className="fixed-header-table__header" ref={el => this.tableHeaderContainer = el}>
        <table ref={el => this.tableHeader = el}>
          <TableHeader orderBy={this.props.orderBy} setOrderBy={this.props.setOrderBy} columns={this.props.columns} />
        </table>
      </div>
    )
  }

  get Body() {
    return (
      <div className="fixed-header-table__body" ref={el => this.tableBodyContainer = el}>
        <table ref={el => this.tableBody = el}>
          <TableBody BodyRowRenderer={this.props.BodyRowRenderer} columns={this.props.columns} data={this.props.displayData} />
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
    return this.props.renderTableLayout ?
      this.props.renderTableLayout(this.Body, this.Header)
      : this.renderLayout();
  }
}

export default FixedHeaderTable;
