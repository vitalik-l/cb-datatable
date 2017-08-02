// @flow
import React, {Component} from 'react';
import Table from './Table';
import Pager from './Pager';
import {orderBy} from './utils';
import classNames from 'classnames';
import type {DataTableContainerProps, TableProps} from './types';

type State = {
  data: Array<Object>,
  currentPage: number,
  orderBy: Object
};

class DataTableContainer extends Component {
  props: DataTableContainerProps;
  data: Array<Object>;
  state: State;

  static defaultProps = {
    TableComponent: Table,
    PagerComponent: Pager,
    orderBy: {},
    rowsPerPage: 20
  };

  constructor(props: DataTableContainerProps) {
    super(props);

    const pagerState = props.PagerComponent ? {
      currentPage: 1
    } : {};

    this.state = {
      data: [],
      orderBy: props.orderBy,
      ...pagerState
    };

    if (props.orderBy) {
      this.data = orderBy(props.data, props.orderBy);
    } else {
      this.data = props.data;
    }
  }

  componentWillReceiveProps(nextProps: DataTableContainerProps) {
    if (this.props.data !== nextProps.data) {
      this.data = nextProps.data;
    }
  }

  get displayData(): Array<Object> {
    if (this.props.PagerComponent) {
      let rowsPerPage = this.props.rowsPerPage,
      indexStart = (+this.state.currentPage - 1) * rowsPerPage;
      return this.data.slice(indexStart, indexStart + rowsPerPage);
    }
    return this.data;
  }

  get tableProps(): TableProps {
    return {
      data: this.props.data,
      columns: this.props.columns,
      orderBy: this.state.orderBy,
      displayData: this.displayData,
      setOrderBy: this.setOrderBy
    };
  }

  get Table(): React$Element<*> {
    return React.createElement(
      this.props.TableComponent,
      this.tableProps
    )
  }

  get Pager(): ?React$Element<*> {
    if (!this.props.PagerComponent) return;
    return React.createElement(
      this.props.PagerComponent,
      {
        data: this.data,
        rowsPerPage: this.props.rowsPerPage,
        setCurrentPage: this.setCurrentPage,
        currentPage: this.state.currentPage
      }
    )
  }

  setOrderBy = (type: Object) => {
    this.data = orderBy(this.data, type);
    this.setState({orderBy: type});
  };

  setCurrentPage = (page: number) => {
    if (this.state.page !== page) {
      this.setState({
        currentPage: page
      });
    }
  };

  renderLayout(Table: React$Element<*>, Pager: ?React$Element<*>) {
    return Pager ?  (
      <div className={classNames('cb-datatable', this.props.className)} onClick={this.props.onClick}>
        <div className="table-container">
          {Table}
        </div>
        {Pager}
      </div>
    ) :  (
      <div className={classNames('cb-datatable', this.props.className)} onClick={this.props.onClick}>
        {Table}
      </div>
    )
  }

  render() {
    return (this.props.renderLayout && this.props.renderLayout(this.Table, this.Pager))
      || this.renderLayout(this.Table, this.Pager);
  }
}

export default DataTableContainer;
