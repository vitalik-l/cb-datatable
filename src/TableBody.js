import React from 'react';
import TableRow from './TableRow';
import TableCell from './TableCell';

const TableBody = React.forwardRef((props, ref) => {
  const { data, columns, Row, Cell, onCellClick, onRowClick, ...restProps } = props;

  return (
    <div className="cb-TableBody" ref={ref} {...restProps}>
      {data.map((item, i) => (
        <Row onClick={onRowClick} key={i}>
          {columns.map((column, i) => (
            <Cell onClick={onCellClick} key={i}>
              {item[column.source]}
            </Cell>
          ))}
        </Row>
      ))}
    </div>
  );
});

TableBody.displayName = 'TableBody';

TableBody.defaultProps = {
  Row: TableRow,
  Cell: TableCell
};

export default TableBody;
