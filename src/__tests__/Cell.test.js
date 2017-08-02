import React from 'react';
import renderer from 'react-test-renderer';
import {shallow} from 'enzyme';
import Cell from '../Cell';

describe('Cell', () => {
  it('Should have className', () => {
    const tree = shallow(
      <Cell
        column={{
          className: 'test',
          name: 'test'
        }}
        row={{test: 'This is a test'}}
      />
    );

    expect(tree.hasClass('test')).toBeTruthy();
  });
});
