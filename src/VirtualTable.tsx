import React from 'react';
import clsx from 'clsx';
import { Table } from './Table';
import { TableBody } from './TableBody';
import { useVirtualTable } from './hooks/useVirtualTable';
import { HeaderCell } from './HeaderCell';

export const VirtualTable = (props: React.ComponentProps<typeof Table>) => {
  const { data = [], className, ...restProps } = props;
  const tableWrapRef = React.useRef<any>();
  const headerCellRefs = React.useRef<Set<any>>(new Set());
  const { rootProps, tableBodyProps, tableProps, containerHeight } = useVirtualTable(data, {
    tableWrapRef,
    headerCellRefs,
  });

  const setHeaderCellRef = React.useCallback((element) => {
    if (element) {
      headerCellRefs.current.add(element);
    }
  }, []);

  return (
    <div className={clsx('cb-VirtualTable', className)} {...rootProps}>
      <div className="cb-VirtualTable-table-wrap" ref={tableWrapRef}>
        <Table
          {...restProps}
          {...tableProps}
          body={<TableBody {...tableBodyProps} />}
          headerCell={<HeaderCell ref={setHeaderCellRef} />}
        />
      </div>
      <div className="cb-VirtualTable__height" style={{ height: containerHeight }} />
    </div>
  );
};
