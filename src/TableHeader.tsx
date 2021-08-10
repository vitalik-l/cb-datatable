import React from 'react';

// local files
import { HeaderCell } from './HeaderCell';

type Props = React.ComponentProps<'thead'> & {
  headerCell?: React.ReactElement;
  useDiv?: boolean;
};

export const TableHeader = React.forwardRef((props: Props, ref: any) => {
  const { children, headerCell, useDiv, ...restProps } = props;
  const THead = useDiv ? 'div' : 'thead';
  const TR = useDiv ? 'div' : 'tr';

  return (
    <THead className="cb-TableHeader" ref={ref} {...restProps}>
      <TR className="cb-TableRow">
        {!!headerCell &&
          React.Children.map(children, (column: any, i) => {
            if (!column) return;
            return React.cloneElement(headerCell, { useDiv, ...column.props, key: i });
          })}
      </TR>
    </THead>
  );
});

TableHeader.defaultProps = {
  headerCell: <HeaderCell />,
};
