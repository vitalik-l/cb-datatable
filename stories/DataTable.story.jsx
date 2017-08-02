import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withKnobs, text, boolean, number } from '@storybook/addon-knobs';

import '../src/styles/table.scss';
import '../src/styles/fixed-header.scss';
import {generateMockData} from '../testUtils';
// import {SimpleTable, FixedHeaderTable, InfiniteTable} from '../src/DataTableDraft';
import DataTable from '../src';
import FixedHeaderTable from '../src/FixedHeaderTable';
import InfiniteTable from '../src/InfiniteTable';

const stories = storiesOf('NewDataTable', module);
stories.addDecorator(withKnobs);

// stories.add('standard', () => {
//     const {columns, data} = generateMockData({columnsNumber: 3, rowsNumber: 10});
//     return <SimpleTable columns={columns} data={data} />;
// });
//
// stories.add('fixed header', () => {
//     const {columns, data} = generateMockData({columnsNumber: 10, rowsNumber: 40});
//     return <FixedHeaderTable columns={columns} data={data} />;
// });
//
// stories.add('infinit table', () => {
//     const {columns, data} = generateMockData({columnsNumber: 10, rowsNumber: 400});
//     return <InfiniteTable columns={columns} data={data} />;
// });

stories.add('prod Table', () => {
  const {columns, data} = generateMockData({columnsNumber: 10, rowsNumber: 50});
  return (
    <span>
      <DataTable columns={columns} data={data} orderBy={{column1: 'asc'}}/>
    </span>
  );
});

stories.add('prod fixed Table', () => {
  const {columns, data} = generateMockData({columnsNumber: 10, rowsNumber: 50});
  return (
    <span>
      <FixedHeaderTable columns={columns} data={data} />
    </span>
  );
});

stories.add('prod infinite Table', () => {
  const {columns, data} = generateMockData({columnsNumber: 10, rowsNumber: 50});
  return (
    <span>
      <InfiniteTable columns={columns} data={data} />
    </span>
  );
});
