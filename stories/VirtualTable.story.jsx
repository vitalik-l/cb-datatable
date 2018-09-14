import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withKnobs, text, boolean, number } from '@storybook/addon-knobs';

import {generateMockData} from '../testUtils';
import VirtualTable from '../src/VirtualTable';

const stories = storiesOf('Virtual Table', module);
stories.addDecorator(withKnobs);

stories.add('default', () => {
  const {columns, data} = generateMockData({columnsNumber: 10, rowsNumber: 500});
  return (
    <span>
      <VirtualTable columns={columns} data={data} />
    </span>
  );
});
