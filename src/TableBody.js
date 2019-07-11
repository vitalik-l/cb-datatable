// @flow
import React from 'react';
import Row from './Row';

type Props = {
  BodyRowRenderer: Function,
  data: Array<Object>,
  columns: Array<Object>,
  onRowClick: Function,
  children: any
};

function TableBody({
  BodyRowRenderer,
  data,
  columns,
  onRowClick,
  children
}: Props)
{
  return (
    <tbody>
    {
      data ? data.map((row, i) =>
        React.createElement(BodyRowRenderer, {row, columns, onRowClick, children, key: i})
      ) : null
    }
    </tbody>
  )
}

TableBody.defaultProps = {
  BodyRowRenderer: Row
};

export default TableBody;
