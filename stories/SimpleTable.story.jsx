import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withKnobs, text, boolean, number } from '@storybook/addon-knobs';

import {generateMockData} from '../testUtils';
import SimpleTable from '../src/SimpleTable';
import VirtualTable from '../src/VirtualTable';
import TextField from '../src/Fields/TextField';

const stories = storiesOf('DataTable', module);
stories.addDecorator(withKnobs);

import './styles/default.scss';

stories.add('default', () => {
  const {columns, data} = generateMockData({columnsNumber: 10, rowsNumber: 500});

  return (
    <span>
      <SimpleTable
        data={data}
        fixedHeader={boolean('fixed header', false)}
        rowsPerPage={number('rows per page', 0)}
        orderBy={{column0: 'asc'}}
        sortable
      >
        <TextField source="column0" label="First column" />
        <TextField source="column1" label="Second column" />
        <TextField source="column2" label="Third column" />
      </SimpleTable>
    </span>
  );
});

stories.add('virtual', () => {
  const {columns, data} = generateMockData({columnsNumber: 10, rowsNumber: 500});

  return (
    <span className="story-virtual">
      <VirtualTable
        data={data}
        orderBy={{column0: 'asc'}}
        sortable
      >
        <TextField source="column0" label="First column" />
        <TextField source="column1" label="Second column" />
        <TextField source="column2" label="Third column" />
      </VirtualTable>
    </span>
  );
});
