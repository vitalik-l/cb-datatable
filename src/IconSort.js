// @flow
import React from 'react';

type Props = {
  type: 'asc|desc'
};

function IconSort({type}: Props) {
  return type === 'asc' ?
    (
      <span> ▲</span>
    ) :
    (
      <span> ▼</span>
    )
}

export default IconSort;
