import React from 'react';

function Column(props) {
  const {children, ...restProps} = props;

  if (typeof children === 'function') {
    return children(restProps);
  }

  const { value } = restProps;
  return <span>{value}</span>
}

export default Column;
