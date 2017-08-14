// @flow
import React from 'react';
import TableHeader from './TableHeader';
import TableBody from './TableBody';
import type {TableProps} from './types';

class Table extends React.Component {
  props: TableProps;

  static defaultProps = {
    orderBy: {}
  };

  render() {
    return (
      <table>
        <TableHeader
          orderBy={this.props.orderBy}
          setOrderBy={this.props.setOrderBy}
          columns={this.props.columns}
        />
        <TableBody
          BodyRowRenderer={this.props.BodyRowRenderer}
          columns={this.props.columns}
          data={this.props.displayData}
          onRowClick={this.props.onRowClick}
        />
      </table>
    )
  }
}

export default Table;
