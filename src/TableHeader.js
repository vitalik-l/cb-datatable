import React from 'react';
import TableRow from './TableRow';
import HeaderCell from './HeaderCell';

const TableHeader = React.forwardRef((props, ref) => {
  const { columns, orderBy, Row, Cell, onRowClick, sortable, setOrder, ...restProps } = props;

  return (
    <div className="cb-TableHeader" ref={ref} {...restProps}>
      <Row onClick={onRowClick}>
        {columns.map((column, i) => (
          <Cell
            setOrder={setOrder}
            orderBy={orderBy}
            sortable={sortable}
            {...column}
            key={i}
          />
        ))}
      </Row>
    </div>
  );
});

TableHeader.displayName = 'TableHeader';

TableHeader.defaultProps = {
  Row: TableRow,
  Cell: HeaderCell
};

export default TableHeader;
