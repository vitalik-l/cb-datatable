import React from 'react';
import clsx from 'clsx';

const TableCell = React.forwardRef((props, ref) => {
  const { children, className, sticky, isHeader, onClick, useDiv, rowSpan, colSpan } = props;
  const [style, setStyle] = React.useState({});
  const cellRef = React.useRef(null);
  const Component = useDiv ? 'div' : isHeader ? 'th' : 'td';
  const isTableCell = Component === 'th' || Component === 'td';
  let cellProps = {};

  if (isTableCell) {
    cellProps = {
      rowSpan,
      colSpan,
    }
  }

  React.useImperativeHandle(ref, () => cellRef.current);

  React.useEffect(() => {
    if (sticky && cellRef.current) {
      setStyle({
        position: 'sticky',
        left: cellRef.current.offsetLeft,
        zIndex: isHeader ? 2 : 1,
      });
    }
  }, [sticky, isHeader]);

  return (
    <Component
      className={clsx('cb-TableCell', className, { 'cb-TableCell--sticky': sticky })}
      style={style}
      onClick={onClick}
      ref={cellRef}
      {...cellProps}
    >
      {children}
    </Component>
  );
});

TableCell.displayName = 'TableCell';

export default TableCell;
