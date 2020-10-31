import React from 'react';
import { Table, TableBody, useInfinite } from '../../src';
import "./InfiniteTable.scss";

export const InfiniteTable = (props) => {
  const { data } = props;
  const {rootProps, tableBodyProps, tableProps, containerHeight} = useInfinite(data);

  return (
    <div className="InfiniteTable" {...rootProps}>
      <div
        className="InfiniteTable-container"
        style={{height: containerHeight}}
      >
        <Table
          {...props}
          {...tableProps}
          body={<TableBody {...tableBodyProps} />}
        />
      </div>
    </div>
  )
};
