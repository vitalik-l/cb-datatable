import React from 'react';

function Column(props) {
  const {children, ...restProps} = props;

  if (children) {
    if (typeof children === 'function') {
      return children(restProps);
    }
    return children;
  }

  const { value } = restProps;
  return <span>{value}</span>
}

export default Column;
