import React from 'react';
import clsx from 'clsx';

const TableCell = React.forwardRef((props, ref) => {
  const { children, className, fixed, isHeader, ...restProps } = props;
  const [style, setStyle] = React.useState({});
  const cellRef = React.useRef(null);

  React.useImperativeHandle(ref, () => cellRef.current);

  React.useEffect(() => {
    if (fixed && cellRef.current) {
      setStyle({
        position: 'sticky',
        left: cellRef.current.offsetLeft,
        zIndex: isHeader ? 2 : 1
      });
    }
  }, [fixed, isHeader]);

  return (
    <div className={clsx('cb-TableCell', className)} style={style} ref={cellRef} {...restProps}>
      {children}
    </div>
  )
});

TableCell.displayName = 'TableCell';

export default TableCell;
