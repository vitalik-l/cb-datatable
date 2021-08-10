import React from 'react';

export const useRowSelect = ({ data, idKey = 'id' }: { data: Array<any>; idKey?: string }) => {
  const [selectedRowIds, setSelectedRowIds] = React.useState<Array<any>>([]);

  const isRowSelected = React.useCallback(
    (record) => selectedRowIds.indexOf(record[idKey]) !== -1,
    [selectedRowIds, idKey],
  );

  const isAllRowsSelected = React.useCallback(() => {
    return (
      selectedRowIds.length &&
      selectedRowIds.filter((id) => data.some((dataItem) => dataItem[idKey] === id)).length ===
        data.length
    );
  }, [selectedRowIds, data, idKey]);

  const toggleRowSelected = React.useCallback(
    (record) => {
      const id = record[idKey];
      const selectedIndex = selectedRowIds.indexOf(id);
      let newSelected: Array<any> = [];

      if (selectedIndex === -1) {
        newSelected = newSelected.concat(selectedRowIds, id);
      } else if (selectedIndex === 0) {
        newSelected = newSelected.concat(selectedRowIds.slice(1));
      } else if (selectedIndex === selectedRowIds.length - 1) {
        newSelected = newSelected.concat(selectedRowIds.slice(0, -1));
      } else if (selectedIndex > 0) {
        newSelected = newSelected.concat(
          selectedRowIds.slice(0, selectedIndex),
          selectedRowIds.slice(selectedIndex + 1),
        );
      }
      setSelectedRowIds(newSelected);
    },
    [selectedRowIds, idKey],
  );

  const toggleAllRowsSelected = React.useCallback(() => {
    if (isAllRowsSelected()) return setSelectedRowIds([]);
    setSelectedRowIds(Array.from(new Set([...selectedRowIds, ...data.map((item) => item[idKey])])));
  }, [selectedRowIds, isAllRowsSelected, idKey]);

  return {
    selectedRowIds,
    setSelectedRowIds,
    isRowSelected,
    isAllRowsSelected,
    toggleRowSelected,
    toggleAllRowsSelected,
  };
};
