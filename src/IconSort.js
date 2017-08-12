// @flow
import React from 'react';

type Props = {
  type: 'asc|desc'
};

function IconSort({type}: Props) {
  return type === 'asc' ?
    (
      <span className="icon-sort icon-sort-asc"> ▲</span>
    ) :
    (
      <span className="icon-sort icon-sort-desc"> ▼</span>
    )
}

export default IconSort;
