import React from 'react';
import {shallow} from 'enzyme';
import Row from '../Row';

describe('Row', () => {
  it('Should have className', () => {
    const tree = shallow(
      <Row
        columns={[]}
        className="test"
      />
    );

    expect(tree.hasClass('test')).toBeTruthy();
  });
});
