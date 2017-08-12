import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withKnobs, text, boolean, number } from '@storybook/addon-knobs';

import '../src/styles/table.scss';
import {generateMockData} from '../testUtils';
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
