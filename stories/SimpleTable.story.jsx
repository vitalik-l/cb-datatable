import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withKnobs, text, boolean, number } from '@storybook/addon-knobs';

import {generateMockData} from '../testUtils';
import SimpleTable from '../src/SimpleTable';
import InfiniteTable from '../src/InfiniteTable';
import TextField from '../src/Fields/TextField';

const stories = storiesOf('DataTable', module);
stories.addDecorator(withKnobs);

import './styles/default.scss';

stories.add('default', () => {
  const {data} = generateMockData({columnsNumber: 10, rowsNumber: 500});

  return (
    <span>
      <SimpleTable
        data={data}
        fixedHeader={boolean('fixed header', false)}
        striped={boolean('striped', false)}
        rowHover={boolean('row hover', false)}
        rowsPerPage={number('rows per page', 0)}
        orderBy={{column0: 'asc'}}
        onRowClick={action('onRowClick')}
        sortable
      >
        <TextField source="column0" label="First column" />
        <TextField source="column1" label="Second column" />
        <TextField source="column2" label="Third column" />
      </SimpleTable>
    </span>
  );
});

stories.add('infinite', () => {
  const {data} = generateMockData({columnsNumber: 10, rowsNumber: 500});

  return (
    <div className="story-infinite">
      <InfiniteTable
        data={data}
        orderBy={{column0: 'asc'}}
        striped={boolean('striped', false)}
        rowHover={boolean('row hover', false)}
        sortable
      >
        <TextField source="column0" label="First column" className="TextField" />
        <TextField source="column1" label="Second column" />
        <TextField source="column2" label="Third column" />
      </InfiniteTable>
    </div>
  );
});
