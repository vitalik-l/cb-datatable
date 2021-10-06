import React from 'react';
import { isFragment } from 'react-is';

export const mapChildren = (
  children: any,
  callback: (child: any, index: number) => any,
  result: any[] = [],
) => {
  React.Children.map(children, (child: any, index) => {
    if (!child || !React.isValidElement(child)) return;
    if (isFragment(child)) {
      mapChildren(child.props.children, callback, result);
      return;
    }
    result.push(callback(child, index));
  });
  return result;
};
