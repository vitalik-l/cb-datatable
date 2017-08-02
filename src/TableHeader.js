// @flow
import React from 'react';
import HeaderColumn from './HeaderColumn';

type Props = {
  columns: Array<Object>,
  orderBy: Object,
  setOrderBy: Function
};

function TableHeader({columns, orderBy, setOrderBy}: Props) {
  return (
    <thead>
      <tr>
        {columns ? columns.map((column, i) =>
          <HeaderColumn orderBy={orderBy} setOrderBy={setOrderBy} {...column} key={i} />
        ) : null}
      </tr>
    </thead>
  );
}

export default TableHeader;
