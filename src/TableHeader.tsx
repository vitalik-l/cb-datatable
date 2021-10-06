import React from 'react';
import { mapChildren } from './utils/mapChildren';

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
          mapChildren(children, (column: any, index) => {
            return React.cloneElement(headerCell, { useDiv, ...column.props, key: index });
          })}
      </TR>
    </THead>
  );
});

TableHeader.defaultProps = {
  headerCell: <HeaderCell />,
};
