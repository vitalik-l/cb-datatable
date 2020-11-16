import React from 'react';
import HeaderCell from './HeaderCell';

const TableHeader = React.forwardRef((props, ref) => {
  const { children, headerCell, useDiv, ...restProps } = props;
  const THead = useDiv ? 'div' : 'thead';
  const TR = useDiv ? 'div' : 'tr';

  return (
    <THead className="cb-TableHeader" ref={ref} {...restProps}>
      <TR className="cb-TableRow">
        {React.Children.map(children, (column, i) => {
          if (!column) return;
          return React.cloneElement(headerCell, { useDiv, ...column.props, key: i });
        })}
      </TR>
    </THead>
  );
});

TableHeader.displayName = 'TableHeader';

TableHeader.defaultProps = {
  headerCell: <HeaderCell />,
};

export default TableHeader;
