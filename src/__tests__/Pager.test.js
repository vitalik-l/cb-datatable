import React from 'react';
import './configureEnzyme';
import {shallow} from 'enzyme';
import Pager from '../Pager';

describe('Pager', () => {
  it('Should display nothing when data is empty', () => {
    const tree = shallow(
      <Pager data={[]} />
    );

    expect(tree.getElement()).toBeNull();
  });
});
