import React from 'react';
import clsx from 'clsx';
import { Table } from './Table';
import { TableBody } from './TableBody';
import { useInfiniteTable } from './hooks/useInfiniteTable';

export const InfiniteTable = (props: React.ComponentProps<typeof Table>) => {
  const { data = [], className, ...restProps } = props;
  const { rootProps, tableBodyProps, tableProps, containerHeight } = useInfiniteTable(data);

  return (
    <div className={clsx('cb-VirtualTable', className)} {...rootProps}>
      <div className="cb-VirtualTable-scroll-height" style={{ height: containerHeight }}>
        <Table {...restProps} {...tableProps} body={<TableBody {...tableBodyProps} />} />
      </div>
    </div>
  );
};
