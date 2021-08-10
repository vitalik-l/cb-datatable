import React from 'react';
import { Story } from '@storybook/react';
import faker from 'faker/locale/en';

// local
import { Table } from '../../src/Table';
import { Column } from '../../src/Column';
import { usePagination } from '../../src/hooks/usePagination';
import { useSortBy } from '../../src/hooks/useSortBy';
import { HeaderCell } from '../../src/HeaderCell';
import { VirtualTable } from '../../src/VirtualTable';
import { InfiniteTable } from '../../src/InfiniteTable';
import './index.css';

const sampleData = [];
for (let i = 0; i < 500; i++) {
  sampleData.push({
    id: i + 1,
    name: faker.name.firstName(),
    lastName: faker.name.lastName(),
    // city: faker.address.city(),
    // streetName: faker.address.streetName(),
    // streetAddress: faker.address.streetAddress(),
    // countryCode: faker.address.countryCode(),
    // country: faker.address.country(),
    // state: faker.address.state(),
  });
}

const columns = Object.keys(sampleData[0]).map((key) => (
  <Column key={key} source={key} label={key} />
));

export default {
  title: 'Demos',
  component: Table,
  args: {
    data: sampleData,
  },
};

export const SimpleTable: Story = (args) => <Table {...args}>{columns}</Table>;

export const WithPagination: Story = ({ data, rowsPerPage, ...args }) => {
  const {
    dataPerPage,
    setPage,
    page,
    hasNextPage,
    hasPreviousPage,
    numberOfPages,
  } = usePagination({ data, rowsPerPage });

  return (
    <div>
      <SimpleTable {...args} data={dataPerPage} />
      <div>
        {hasPreviousPage && <button onClick={() => setPage(page - 1)}>Prev</button>}
        {page}/{numberOfPages}
        {hasNextPage && <button onClick={() => setPage(page + 1)}>Next</button>}
      </div>
    </div>
  );
};
WithPagination.argTypes = {
  rowsPerPage: {
    control: 'number',
  },
};
WithPagination.args = {
  rowsPerPage: 10,
};

export const WithSorting: Story = ({ data, sortBy: sortByProp, ...args }) => {
  const { sortedData, setSortBy, sortBy } = useSortBy({ data, defaultSortBy: sortByProp });

  return (
    <WithPagination
      {...args}
      data={sortedData}
      headerCell={<HeaderCell sortBy={sortBy} setSortBy={setSortBy} sortable />}
    />
  );
};
WithSorting.argTypes = WithPagination.argTypes;
WithSorting.args = {
  ...WithPagination.args,
  sortBy: [{ id: 'id', desc: false }],
};

export const Virtual: Story = ({ data, sortBy: sortByProp, ...args }) => {
  const { sortedData, setSortBy, sortBy } = useSortBy({ data, defaultSortBy: sortByProp });

  return (
    <VirtualTable
      {...args}
      data={sortedData}
      className="demo-virtual"
      headerCell={<HeaderCell sortBy={sortBy} setSortBy={setSortBy} sortable />}
    >
      {columns}
    </VirtualTable>
  );
}
Virtual.args = {
  stickyHeader: true,
}

export const Infinite: Story = ({ data, sortBy: sortByProp, ...args }) => {
  const { sortedData, setSortBy, sortBy } = useSortBy({ data, defaultSortBy: sortByProp });

  return (
    <InfiniteTable
      {...args}
      data={sortedData}
      className="demo-virtual"
      headerCell={<HeaderCell sortBy={sortBy} setSortBy={setSortBy} sortable />}
    >
      {columns}
    </InfiniteTable>
  );
}
Infinite.args = {
  stickyHeader: true,
}