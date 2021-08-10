import React from 'react';

export const Column = (props: any) => {
  const { children, ...restProps } = props;

  if (children) {
    if (typeof children === 'function') {
      return children(restProps);
    }
    return children;
  }

  return <span>{restProps.value}</span>;
};
