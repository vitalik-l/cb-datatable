import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withKnobs, text, boolean, number } from '@storybook/addon-knobs';

import {generateMockData} from '../testUtils';
import DataTable from './DataTable';
import Field from '../src/Field';

const stories = storiesOf('DataTable', module);
stories.addDecorator(withKnobs);

import './styles/default.scss';

stories.add('default', () => {
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
        orderBy={{column0: 'asc'}}
        onRowClick={action('onRowClick')}
        sortable
      >
        <Field source="column0" label={<span>&nbsp;</span>} sticky />
        <Field source="column1" label="Second column" sticky />
        <Field source="column2" label="Third column" colored />
        <Field source="column3" label={<div>4 column</div>} />
        <Field source="column4" label={<div>5 column</div>} />
        <Field source="column5" label={<div>6 column</div>} />
        <Field source="column6" label={<div>7 column</div>} />
      </DataTable>
    </div>
  );
});
