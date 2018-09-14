import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withKnobs, text, boolean, number } from '@storybook/addon-knobs';

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

stories.add('test data', () => {
  const mockData = generateMockData({
    columnLabel: i => {
      if (i === 3) return 'longstringlongstring';
      return 'column' + i;
    },
    columnsNumber: 6,
    rowsNumber: 30,
    dataFunc: (column, i) => {
      if (column.name === 'column3') return '';
      return column.name + ' long data' + i;
    }
  });

  class Test extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        ...mockData
      };
    }

    onClearData = () => {
      this.setState({
        data: [{
          column0: '',
          column1: '',
          column2: '',
          column3: '',
          column4: '',
          column5: '',
        }]
      });
    };

    onSetData = () => {
      this.setState({
        data: mockData.data
      });
    };

    render() {
      return (
        <span>
          <button onClick={this.onSetData}>Set data</button>
          <button onClick={this.onClearData}>Clear data</button>
          <FixedHeaderTable columns={this.state.columns} data={this.state.data} />
        </span>
      );
    }
  }

  return (
    <Test />
  );
});

