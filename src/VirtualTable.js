import React from 'react';
import Table from './Table';
import TableBody from './TableBody';
import TableHeader from './TableHeader';

function VirtualTable(props) {
  const {data, children} = props;
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [offset, setOffset] = React.useState(0);
  const [numberOfVisibleItems, setNumberOfVisibleItems] = React.useState(1);
  const [containerHeight, setContainerHeight] = React.useState(0);
  const tableContainerNode = React.useRef();
  const rootNode = React.useRef();
  const bodyNode = React.useRef();
  const tableNode = React.useRef();
  const itemsCount = data.length;
  const displayData = React.useMemo(() => {
    return data.slice(currentIndex, currentIndex + numberOfVisibleItems);
  }, [currentIndex, numberOfVisibleItems]);

  React.useEffect(() => {
    if (displayData.length) {
      // calculate container height
      const firstRowNode = tableContainerNode.current.querySelector('.cb-TableRow');
      const rowHeight = firstRowNode.offsetHeight;

      setContainerHeight(rowHeight * itemsCount);

      //
      const newValue = Math.ceil(rootNode.current.offsetHeight/rowHeight);
      setNumberOfVisibleItems(newValue + 3);
    }
  }, [displayData]);

  function onScroll() {
    const firstRowNode = tableContainerNode.current.querySelector('.cb-TableRow');
    if (firstRowNode) {
      const rowHeight = firstRowNode.offsetHeight;
      const scrollTop = rootNode.current.scrollTop;
      const nextOffset = -1*(scrollTop % rowHeight);
      const newIndex = Math.floor(scrollTop/rowHeight);
      if (newIndex !== currentIndex) {
        setCurrentIndex(newIndex);
      }
      setOffset(nextOffset);
    }
  }

  const columns = React.Children.map(children, item => item.props);

  return (
    <div className="cb-DataTable cb-DataTable--virtual" ref={rootNode} onScroll={onScroll}>
      <div className="cb-TableContainer" style={{height: containerHeight}} ref={tableContainerNode}>
        <Table ref={tableNode}>
          <TableHeader columns={columns} />
          <TableBody
            ref={bodyNode}
            style={{transform: `translateY(${offset}px)`}}
            columns={columns}
            data={displayData}
          />
        </Table>
      </div>
    </div>
  )
}

export default VirtualTable;
