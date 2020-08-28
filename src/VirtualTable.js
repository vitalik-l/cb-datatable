import React from 'react';
import Table from './Table';
import TableHeader from './TableHeader';
import TableBody from './TableBody';
import TableCell from './TableCell';
import useSorting from './useSorting';
import clsx from 'clsx';

function VirtualTable(props) {
  const {data, sortable, orderBy, onSort, children, striped, rowHover, className} = props;
  const {order, setOrder, sortedData} = useSorting({data, orderBy, onSort});
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [offset, setOffset] = React.useState(0);
  const [numberOfVisibleItems, setNumberOfVisibleItems] = React.useState(1);
  const tableContainerNode = React.useRef();

  const spacerHeight = React.useRef(0);
  const rootNode = React.useRef();
  const bodyNode = React.useRef();
  const tableNode = React.useRef();
  const itemsCount = data.length;

  const displayData = React.useMemo(() => {
    return sortedData.slice(currentIndex, currentIndex + numberOfVisibleItems);
  }, [sortedData, currentIndex, numberOfVisibleItems]);

  React.useLayoutEffect(() => {
    if (displayData.length) {
      // calculate container height
      const firstRowNode = bodyNode.current.querySelector('.cb-TableRow');
      const rowHeight = firstRowNode.offsetHeight;
      const newNumberOfVisibleElements = Math.ceil(rootNode.current.offsetHeight/rowHeight) + 3;

      spacerHeight.current = rowHeight * itemsCount - rowHeight * newNumberOfVisibleElements;
      setNumberOfVisibleItems(newNumberOfVisibleElements);
    }
  }, [displayData]);

  function onScroll() {
    const firstRowNode = bodyNode.current.querySelector('.cb-TableRow');
    if (firstRowNode) {
      const scrollTop = rootNode.current.scrollTop;
      if (scrollTop >= 0) {
        const rowHeight = firstRowNode.offsetHeight;
        const newIndex = Math.floor(scrollTop / rowHeight);
        if (newIndex !== currentIndex) {
          const newOffset = newIndex * rowHeight;
          setCurrentIndex(newIndex);
          setOffset(newOffset);
        }
      }
    }
  }

  const columns = React.Children.map(children, item => item.props);

  return (
    <div className={clsx('cb-DataTable cb-DataTable--virtual', className)} ref={rootNode} onScroll={onScroll}>
      <div
        className="cb-TableContainer"
        ref={tableContainerNode}
      >
        <Table ref={tableNode} >
          <TableHeader
            setOrder={setOrder}
            sortable={sortable}
            orderBy={order}
            columns={columns}
          />
          <TableBody
            ref={bodyNode}
            striped={striped}
            data={displayData}
            currentIndex={currentIndex}
            rowHover={rowHover}
            cell={<TableCell style={{transform: `translateY(${offset}px)`}} />}
          >
            {children}
          </TableBody>
          <div style={{height: spacerHeight.current}} />
        </Table>
      </div>
    </div>
  )
}

export default VirtualTable;
