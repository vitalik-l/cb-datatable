import clsx from 'clsx';
import React from 'react';

export type TableCellProps = {
  sticky?: boolean | 'right';
  isHeader?: boolean;
  useDiv?: boolean;
  rowSpan?: string | number;
  colSpan?: string | number;
} & React.ComponentProps<'div'>;

export const TableCell = React.forwardRef((props: TableCellProps, ref) => {
  const {
    children,
    className,
    sticky,
    isHeader,
    onClick,
    useDiv,
    rowSpan,
    colSpan,
    style: styleProp,
  } = props;
  const [style, setStyle] = React.useState({});
  const cellRef = React.useRef<any>(null);
  const Component = useDiv ? 'div' : isHeader ? 'th' : 'td';
  const isTableCell = Component === 'th' || Component === 'td';
  let cellProps = {};

  if (isTableCell) {
    cellProps = {
      rowSpan,
      colSpan,
    };
  }

  React.useImperativeHandle(ref, () => cellRef.current);

  React.useEffect(() => {
    if (sticky && cellRef.current) {
      const isRightSticky = sticky === 'right';

      setStyle({
        position: 'sticky',
        left: isRightSticky ? undefined : cellRef.current.offsetLeft,
        right: isRightSticky ? 0 : undefined,
        zIndex: isHeader ? 2 : 1,
      });
    }
  }, [sticky, isHeader]);

  return (
    <Component
      className={clsx('cb-TableCell', className, { 'cb-TableCell_sticky': sticky })}
      style={{ ...style, ...styleProp }}
      onClick={onClick}
      ref={cellRef}
      {...cellProps}
    >
      {children}
    </Component>
  );
});
