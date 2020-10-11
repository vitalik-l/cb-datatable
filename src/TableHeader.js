import React from 'react';
import HeaderCell from './HeaderCell';

const TableHeader = React.forwardRef((props, ref) => {
  const { children, headerCell, ...restProps } = props;

  return (
    <thead className="cb-TableHeader" ref={ref} {...restProps}>
      <tr className="cb-TableRow">
        {React.Children.map(children, (column, i) => {
          if (!column) return;
          return React.cloneElement(headerCell, {...column.props, key: i})
        })}
      </tr>
    </thead>
  );
});

TableHeader.displayName = 'TableHeader';

TableHeader.defaultProps = {
  headerCell: <HeaderCell />
};

export default TableHeader;
