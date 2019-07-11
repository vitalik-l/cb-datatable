// @flow
import React from 'react';
import classNames from 'classnames';
import IconSort from './IconSort';
import type {ColumnType} from './types';

type Props = ColumnType & {
  setOrderBy: Function
};

class HeaderColumn extends React.Component<Props> {
  props: Props;

  static defaultProps = {
    sortable: true
  };

  get label() {
    return this.props.label || this.props.source;
  }

  get name() {
    return this.props.name || this.props.source;
  }

  get sorting(): ('asc'|'desc'|'') {
    if (!this.props.orderBy) return '';
    return this.props.orderBy[this.name] || '';
  }

  onColumnClick = (e: Event) => {
    if (!this.props.sortable) return;
    let newSorting = this.sorting === 'asc' ? 'desc' : 'asc';
    this.props.setOrderBy({[this.name]: newSorting});
  };

  render() {
    const {label, sortable, visible, className} = this.props;
    if (visible === false) return null;
    return (
      <th className={classNames(className, {sortable, ['sort-' + this.sorting]: this.sorting})} onClick={this.onColumnClick}>
        <div className="th-content">
          {this.sorting ? <div className="th-content__label">{this.label}</div> : this.label}
          {this.sorting ? <IconSort type={this.sorting} /> : null}
        </div>
      </th>
    )
  }
}

export default HeaderColumn;
