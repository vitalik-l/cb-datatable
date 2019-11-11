import React from 'react';
import {shallow} from 'enzyme';
import renderer from 'react-test-renderer';
import Row from '../Row';
import TextField from '../Fields/TextField';
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
  });

  it('should pass index prop', () => {
    const tree = shallow(
      <Row
        row={{test: 1}}
        index={1}
      >
        <TextField />
      </Row>
    );

    expect(tree.find(TextField).props().index).toEqual(1);
  });
});
