// @flow

import React from 'react';
import classNames from 'classnames';
import IconSort from './IconSort';

type Props = {
  name: string,
  sortable: boolean,
  label: any,
  orderBy: Object,
  setOrderBy: Function
};

class HeaderColumn extends React.Component {
  props: Props;

  static defaultProps = {
    sortable: true
  };

  get sorting(): ('asc'|'desc'|'') {
    return this.props.orderBy[this.props.name] || '';
  }

  onColumnClick = (e: Event) => {
    let newSorting = this.sorting === 'asc' ? 'desc' : 'asc';
    this.props.setOrderBy({[this.props.name]: newSorting});
  };

  render() {
    const {label, sortable} = this.props;
    return (
      <th className={classNames({sortable, ['sort-' + this.sorting]: this.sorting})} onClick={this.onColumnClick}>
        <div className="th-content">
          {this.sorting ? <div className="th-content__label">{label}</div> : label}
          {this.sorting ? <IconSort type={this.sorting} /> : null}
        </div>
      </th>
    )
  }
}

export default HeaderColumn;
