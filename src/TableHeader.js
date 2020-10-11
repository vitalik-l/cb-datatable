import React from 'react';
import TableRow from './TableRow';
import HeaderCell from './HeaderCell';

const TableHeader = React.forwardRef((props, ref) => {
  const { children, sortBy, Cell, sortable, setSortBy, ...restProps } = props;

  return (
    <thead className="cb-TableHeader" ref={ref} {...restProps}>
      <tr className="cb-TableRow">
        {React.Children.map(children, (column, i) => (
          <Cell
            setSortBy={setSortBy}
            sortBy={sortBy}
            sortable={sortable}
            {...column.props}
            key={i}
          />
        ))}
      </tr>
    </thead>
  );
});

TableHeader.displayName = 'TableHeader';

TableHeader.defaultProps = {
  Cell: HeaderCell
};

export default TableHeader;
