import React from 'react';
import { get } from './utils/get';

type Props = {
  value?: Array<any>;
  children?: React.ReactElement;
};

export const ArrayColumn = ({ value, children }: Props) => {
  if (!value || !children) return;

  return value.map((item) => (
    <div>
      {React.cloneElement(children, { record: item, value: get(item, children.props.source) })}
    </div>
  ));
};
