// @flow
import React from 'react';
import Row from './Row';
import type {RowProps} from './types';

function BodyRowRenderer(props: RowProps) {
  return [
    <Row {...props} />
  ]
}

export default BodyRowRenderer;
