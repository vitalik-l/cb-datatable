// @flow
import React from 'react';
import BodyRowRenderer from './BodyRowRenderer';

type Props = {
  BodyRowRenderer: Function,
  data: Array<Object>,
  columns: Array<Object>,
  onRowClick: Function
};

function TableBody({
  BodyRowRenderer,
  data,
  columns,
  onRowClick
}: Props)
{
  return (
    <tbody>
    {
      data ? data.map((row, i) => (
        BodyRowRenderer({row, columns, onRowClick}).map(rowElement => rowElement))
      ) : null
    }
    </tbody>
  )
}

TableBody.defaultProps = {
  BodyRowRenderer: BodyRowRenderer
};

export default TableBody;
