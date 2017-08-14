import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withKnobs, text, boolean, number } from '@storybook/addon-knobs';

import '../src/styles/table.scss';
import {generateMockData, generateDataForColumns} from '../testUtils';
import DataTable from '../src';

const stories = storiesOf('DataTable', module);
stories.addDecorator(withKnobs);

stories.add('default', () => {
  const {columns, data} = generateMockData({columnsNumber: 10, rowsNumber: 50});
  return (
    <span>
      <DataTable columns={columns} data={data} orderBy={{column1: 'asc'}}/>
    </span>
  );
});

stories.add('Hidden column', () => {
  let columns = [];
  for (let i=0; i < 5; i++) {
    if (i === 1) {
      columns.push({
        name: 'column' + i,
        label: 'column' + i,
        visible: false
      });
      continue;
    }
    columns.push({
      name: 'column' + i,
      label: 'column' + i
    });
  }
  const data = generateDataForColumns(columns, 100);
  return (
    <span>
      <span>Column 1 should be hidden</span>
      <DataTable columns={columns} data={data} orderBy={{column2: 'asc'}}/>
    </span>
  );
});
