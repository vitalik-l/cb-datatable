// @flow
import React from 'react';
import BodyRowRenderer from './BodyRowRenderer';

type Props = {
  BodyRowRenderer: Function,
  data: Array<Object>,
  columns: Array<Object>
};

function TableBody({BodyRowRenderer, data, columns}: Props) {
  return (
    <tbody>
    {
      data ? data.map((row, i) => (
        BodyRowRenderer(row, columns).map(rowElement => rowElement))
      ) : null
    }
    </tbody>
  )
}

TableBody.defaultProps = {
  BodyRowRenderer: BodyRowRenderer
};

export default TableBody;
