import React from 'react';
import TableRow from './TableRow';
import HeaderCell from './HeaderCell';

const TableHeader = React.forwardRef((props, ref) => {
  const { children, orderBy, Cell, sortable, setOrder, ...restProps } = props;

  return (
    <div className="cb-TableHeader" ref={ref} {...restProps}>
      <div className="cb-TableRow">
        {React.Children.map(children, (column, i) => (
          <Cell
            setOrder={setOrder}
            orderBy={orderBy}
            sortable={sortable}
            {...column.props}
            key={i}
          />
        ))}
      </div>
    </div>
  );
});

TableHeader.displayName = 'TableHeader';

TableHeader.defaultProps = {
  Cell: HeaderCell
};

export default TableHeader;
