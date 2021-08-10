import React from 'react';

const EXTRA_ROWS_NUMBER = 8;

export const useVirtualTable = (
  data: Array<any>,
  {
    tableWrapRef,
    headerCellRefs,
  }: {
    tableWrapRef: any;
    headerCellRefs: React.RefObject<Set<HTMLElement>>;
  },
) => {
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [numberOfVisibleItems, setNumberOfVisibleItems] = React.useState(1);
  const containerHeight = React.useRef(0);
  const rootRef = React.useRef<any>();
  const bodyRef = React.useRef<any>();
  const itemsCount = data.length;

  const displayData = React.useMemo(() => {
    return data.slice(currentIndex, currentIndex + numberOfVisibleItems);
  }, [data, currentIndex, numberOfVisibleItems]);

  React.useLayoutEffect(() => {
    if (displayData.length) {
      // calculate container height
      const firstRowNode = bodyRef.current.querySelector('.cb-TableRow');
      if (firstRowNode) {
        const rowHeight = firstRowNode.offsetHeight;
        const newNumberOfVisibleElements =
          Math.ceil(rootRef.current.offsetHeight / rowHeight) + 3 + EXTRA_ROWS_NUMBER;

        containerHeight.current = rowHeight * itemsCount;
        if (newNumberOfVisibleElements !== numberOfVisibleItems) {
          setNumberOfVisibleItems(newNumberOfVisibleElements);
        }
      }
    }
  }, [displayData]);

  const onScroll = () => {
    const firstRowNode = bodyRef.current.querySelector('.cb-TableRow');
    if (firstRowNode) {
      const scrollTop = rootRef.current.scrollTop;
      if (scrollTop >= 0) {
        const rowHeight = firstRowNode.offsetHeight;
        const newIndex = Math.max(
          0,
          Math.floor((scrollTop - EXTRA_ROWS_NUMBER * rowHeight) / rowHeight),
        );
        if (newIndex !== currentIndex) {
          const newOffset = newIndex * rowHeight;
          tableWrapRef.current.style.transform = `translateY(${newOffset}px)`;
          if (headerCellRefs) {
            headerCellRefs.current?.forEach((element) => {
              element.style.top = `-${newOffset}px`;
            });
          }
          setCurrentIndex(newIndex);
        }
      }
    }
  };

  return {
    rootProps: {
      ref: rootRef,
      onScroll,
    },
    tableProps: {
      data: displayData,
    },
    tableBodyProps: {
      ref: bodyRef,
      currentIndex,
    },
    containerHeight: containerHeight.current,
  };
};
