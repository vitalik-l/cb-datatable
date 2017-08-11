import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withKnobs, text, boolean, number } from '@storybook/addon-knobs';

import '../src/styles/table.scss';
import '../src/styles/fixed-header.scss';
import {generateMockData} from '../testUtils';
import FixedHeaderTable from '../src/FixedHeaderTable';

const stories = storiesOf('Fixed Header', module);
stories.addDecorator(withKnobs);

stories.add('default', () => {
  const {columns, data} = generateMockData({columnsNumber: 10, rowsNumber: 50});
  return (
    <span>
      <FixedHeaderTable columns={columns} data={data} />
    </span>
  );
});

stories.add('with empty column', () => {
  const {columns, data} = generateMockData({
    columnLabel: i => {
      if (i === 3) return 'longstringlongstring';
      return 'column' + i;
    },
    columnsNumber: 10,
    rowsNumber: 50,
    dataFunc: (column, i) => {
      if (column.name === 'column3') return '';
      return column.name + ' ' + i;
    }
  });
  return (
    <span>
      <FixedHeaderTable columns={columns} data={data} />
    </span>
  );
});

