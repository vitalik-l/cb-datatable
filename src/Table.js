// @flow
import React from 'react';
import TableHeader from './TableHeader';
import TableBody from './TableBody';
import type {TableProps} from './types';

class Table extends React.Component<TableProps> {
  props: TableProps;

  static defaultProps = {
    orderBy: {}
  };

  render() {
    let columns = this.props.columns;

    if (!columns) {
      columns = React.Children.map(this.props.children, (item) => {
        return item.props;
      });
    }

    return (
      <table>
        <TableHeader
          orderBy={this.props.orderBy}
          setOrderBy={this.props.setOrderBy}
          columns={columns}
        />
        <TableBody
          BodyRowRenderer={this.props.BodyRowRenderer}
          children={this.props.children}
          columns={columns}
          data={this.props.displayData}
          onRowClick={this.props.onRowClick}
        />
      </table>
    )
  }
}

export default Table;
