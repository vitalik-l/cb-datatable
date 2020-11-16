import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withKnobs, text, boolean, number } from '@storybook/addon-knobs';

import {generateMockData} from '../testUtils';
import DataTable from './DataTable';
import { InfiniteTable } from './InfiniteTable';
import { Column, TableRow } from '../src';

const stories = storiesOf('DataTable', module);
stories.addDecorator(withKnobs);

import './styles/default.scss';

stories.add('default', () => {
  const {data} = generateMockData({columnsNumber: 10, rowsNumber: 50,
    dataFunc: (column, index) => {
      if (column.name === 'column2') {
        return index < 2 || index === 4;
      }
      return `${column.name} ${index}`;
    }
  });

  return (
    <div style={{
      width: 400,
      height: 200,
      overflow: 'auto'
    }}>
      <DataTable
        data={data}
        stickyHeader={boolean('sticky header', false)}
        striped={boolean('striped', false)}
        rowHover={boolean('row hover', false)}
        rowsPerPage={number('rows per page', 0)}
        onRowClick={action('onRowClick')}
        useDiv={boolean('use div', false)}
        multiSort={boolean('multi sort', true)}
        sortable
      >
        <Column source="column0" label={<span>&nbsp;</span>} sticky />
        <Column source="column1" label="Second column" sortable={false} />
        <Column source="column2" label="Third column" colored />
        <Column source="column3" label={<div>4 column</div>} />
        <Column source="column4" label={<div>5 column</div>} />
        <Column source="column5" label={<div>6 column</div>} />
        <Column source="column6" label={<div>7 column</div>} />
        <Column>
          test children
        </Column>
      </DataTable>
    </div>
  );
});

const Row = (props) => {
  return (
    <React.Fragment>
      <TableRow {...props}>
        <Column source="id" rowSpan={2} />
        <Column source="title" colSpan={2} />
        <Column rowSpan={2}>
          <button>action</button>
        </Column>
      </TableRow>
      <TableRow {...props}>
        <Column source="name" />
        <Column source="some"  />
      </TableRow>
    </React.Fragment>
  )
};

stories.add('custom layout', () => {
  const data = [
    {
      id: 1,
      title: 'Title',
      name: 'firstName lastName',
      some: 'test string',
    },
    {
      id: 2,
      title: '2 Title',
      name: 'firstName lastName another',
      some: 'test string second column',
    }
  ];

  return (
    <div style={{
      width: 400,
      height: 200,
      overflow: 'auto'
    }}>
      <DataTable
        data={data}
        stickyHeader={boolean('sticky header', false)}
        striped={boolean('striped', false)}
        rowHover={boolean('row hover', false)}
        rowsPerPage={number('rows per page', 0)}
        onRowClick={action('onRowClick')}
        useDiv={boolean('use div', false)}
        multiSort={boolean('multi sort', true)}
        row={<Row />}
        sortable
      >
        <Column source="id" label="id" />
        <Column source="title" label="data" colSpan={2} />
        <Column label="action" />
      </DataTable>
    </div>
  );
});

stories.add('selectable', () => {
  const {data} = generateMockData({columnsNumber: 10, rowsNumber: 50});

  return (
    <div style={{
      width: 400,
      height: 200,
      overflow: 'auto'
    }}>
      <DataTable
        data={data}
        stickyHeader={boolean('sticky header', false)}
        striped={boolean('striped', false)}
        rowHover={boolean('row hover', false)}
        rowsPerPage={number('rows per page', 0)}
        defaultSortBy={{column0: 'asc'}}
        onRowClick={action('onRowClick')}
        selectable
        sortable
      >
        <Column source="column0" label={<span>&nbsp;</span>} />
        <Column source="column1" label="Second column" sortable={false} />
        <Column source="column2" label="Third column" colored />
        <Column source="column3" label={<div>4 column</div>} />
        <Column source="column4" label={<div>5 column</div>} />
        <Column source="column5" label={<div>6 column</div>} />
        <Column source="column6" label={<div>7 column</div>} />
      </DataTable>
    </div>
  );
});

stories.add('infinite', () => {
  const {data} = generateMockData({columnsNumber: 10, rowsNumber: 50});

  return (
    <div style={{
      width: 400,
      height: 200,
    }}>
      <InfiniteTable
        data={data}
        stickyHeader={boolean('sticky header', false)}
        striped={boolean('striped', false)}
        rowHover={boolean('row hover', false)}
        onRowClick={action('onRowClick')}
      >
        <Column source="column0" label={<span>&nbsp;</span>} />
        <Column source="column1" label="Second column" />
        <Column source="column2" label="Third column" colored />
        <Column source="column3" label={<div>4 column</div>} />
        <Column source="column4" label={<div>5 column</div>} />
        <Column source="column5" label={<div>6 column</div>} />
        <Column source="column6" label={<div>7 column</div>} />
      </InfiniteTable>
    </div>
  );
});

