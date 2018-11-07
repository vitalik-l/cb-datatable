import React from 'react';
import {shallow} from 'enzyme';
import renderer from 'react-test-renderer';
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

  it('Should pass a data prop', () => {
    const tree = renderer.create(
      <Row
        columns={[]}
        className="test"
        data-tooltip="tooltip"
        onMouseOver={() => {}}
      />
    );

    expect(tree.toJSON()).toMatchSnapshot();
  })
});
