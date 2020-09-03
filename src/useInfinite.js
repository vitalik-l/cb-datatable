import React from 'react';

const EXTRA_ROWS_NUMBER = 4;

function useInfinite(data) {
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [offset, setOffset] = React.useState(0);
  const [numberOfVisibleItems, setNumberOfVisibleItems] = React.useState(1);
  const containerHeight = React.useRef(0);
  const rootNode = React.useRef();
  const bodyNode = React.useRef();
  const itemsCount = data.length;

  const displayData = React.useMemo(() => {
    return data.slice(currentIndex, currentIndex + numberOfVisibleItems);
  }, [data, currentIndex, numberOfVisibleItems]);

  React.useLayoutEffect(() => {
    if (displayData.length) {
      // calculate container height
      const firstRowNode = bodyNode.current.querySelector('.cb-TableRow');
      const rowHeight = firstRowNode.offsetHeight;
      const newNumberOfVisibleElements = Math.ceil(rootNode.current.offsetHeight/rowHeight) + 3 + EXTRA_ROWS_NUMBER;

      containerHeight.current = rowHeight * itemsCount;
      if (newNumberOfVisibleElements !== numberOfVisibleItems) {
        setNumberOfVisibleItems(newNumberOfVisibleElements);
      }
    }
  }, [displayData]);

  function onScroll() {
    const firstRowNode = bodyNode.current.querySelector('.cb-TableRow');
    if (firstRowNode) {
      const scrollTop = rootNode.current.scrollTop;
      if (scrollTop >= 0) {
        const rowHeight = firstRowNode.offsetHeight;
        const newIndex = Math.max(0, Math.floor((scrollTop - EXTRA_ROWS_NUMBER*rowHeight)/rowHeight));
        if (newIndex !== currentIndex) {
          const newOffset = newIndex * rowHeight;
          setCurrentIndex(newIndex);
          setOffset(newOffset);
        }
      }
    }
  }

  return {
    rootProps: {
      ref: rootNode,
      onScroll,
    },
    tableBodyProps: {
      ref: bodyNode,
      data: displayData,
      offset,
      currentIndex,
    },
    containerHeight: containerHeight.current
}
}

export default useInfinite;
