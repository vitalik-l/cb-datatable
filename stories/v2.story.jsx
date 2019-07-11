import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withKnobs, text, boolean, number } from '@storybook/addon-knobs';

import '../src/styles/index.scss';
import './styles/table.scss';
import {generateMockData, generateDataForColumns} from '../testUtils';
import DataTable from '../src';
import FixedHeaderTable from '../src/FixedHeaderTable';
import TextField from './components/TextField';

const stories = storiesOf('v2', module);
stories.addDecorator(withKnobs);

stories.add('default', () => {
  const {columns, data} = generateMockData({columnsNumber: 10, rowsNumber: 50});
  return (
    <span>
      <DataTable data={data} orderBy={{column1: 'asc'}} onRowClick={action('onRowClick')}>
        <TextField label="column0" source="column0" />
        <TextField label="column1" source="column1" />
        <TextField label="column2" source="column2" />
      </DataTable>
    </span>
  );
});

stories.add('FixedHeaderTable', () => {
  const {columns, data} = generateMockData({columnsNumber: 10, rowsNumber: 50});
  return (
    <span>
      <FixedHeaderTable data={data} orderBy={{column1: 'asc'}} onRowClick={action('onRowClick')}>
        <TextField label="column0" source="column0" />
        <TextField label="column1" source="column1" />
        <TextField label="column2" source="column2" />
      </FixedHeaderTable>
    </span>
  );
});

