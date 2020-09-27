import React from 'react';
import clsx from 'clsx';

const sanitizeRestProps = ({
  label,
  source,
  ...rest
}) => rest;

const TableCell = React.forwardRef((props, ref) => {
  const { children, className, sticky, isHeader, ...restProps } = props;
  const [style, setStyle] = React.useState({});
  const cellRef = React.useRef(null);

  React.useImperativeHandle(ref, () => cellRef.current);

  React.useEffect(() => {
    if (sticky && cellRef.current) {
      setStyle({
        position: 'sticky',
        left: cellRef.current.offsetLeft,
        zIndex: isHeader ? 2 : 1
      });
    }
  }, [sticky, isHeader]);

  return (
    <div className={clsx('cb-TableCell', className)} style={style} ref={cellRef} {...sanitizeRestProps(restProps)}>
      {children}
    </div>
  )
});

TableCell.displayName = 'TableCell';

export default TableCell;
