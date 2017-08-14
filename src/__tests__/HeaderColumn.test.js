import React from 'react';
import renderer from 'react-test-renderer';
import {shallow} from 'enzyme';
import HeaderColumn from '../HeaderColumn';

describe('HeaderColumn', () => {
  it('Visibility. Should return null if column visible prop is false', () => {
    const tree = shallow(
      <HeaderColumn
        visible={false}
      />
    );

    expect(tree.getNode()).toBeNull();
  })
});
