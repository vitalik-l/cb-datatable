import React from 'react';
import TableRow from './TableRow';
import clsx from 'clsx';

const TableBody = React.forwardRef((props, ref) => {
  const {
    row,
    data,
    currentIndex,
    onRowClick,
    children,
    striped,
    rowHover,
    className,
    offset,
    useDiv,
    ...restProps
  } = props;

  const Component = useDiv ? 'div' : 'tbody';

  return (
    <Component
      className={clsx('cb-TableBody', className, { 'cb-TableBody--row-hover': rowHover })}
      ref={ref}
      {...restProps}
    >
      {offset >= 0 ? <tr className="cb-RowSpacer" style={{ height: offset }} /> : null}
      {data.map((record, recordIndex) => {
        const index = recordIndex + currentIndex;
        let oddEvenClassName;

        if (striped) {
          oddEvenClassName = index % 2 > 0 ? 'cb-TableRow--odd' : 'cb-TableRow--even';
        }

        return React.cloneElement(
          row,
          {
            className: oddEvenClassName,
            onClick: onRowClick,
            record,
            index,
            useDiv,
            key: index,
          },
          children,
        );
      })}
    </Component>
  );
});

TableBody.displayName = 'TableBody';

TableBody.defaultProps = {
  data: [],
  currentIndex: 0,
  row: <TableRow />,
};

export default TableBody;
