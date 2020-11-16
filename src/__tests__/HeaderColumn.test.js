import React from 'react';
import sinon from 'sinon';
import './configureEnzyme';
import { shallow } from 'enzyme';
import HeaderColumn from '../HeaderColumn';

describe('HeaderColumn', () => {
  it('Visibility. Should return null if column visible prop is false', () => {
    const tree = shallow(<HeaderColumn visible={false} />);

    expect(tree.getElement()).toBeNull();
  });

  it('Should have a className prop', () => {
    const tree = shallow(<HeaderColumn className="test" />);

    expect(tree.hasClass('test')).toBeTruthy();
  });

  it("Shouldn't have a className prop", () => {
    const tree = shallow(<HeaderColumn />);

    expect(tree.hasClass('test')).toBeFalsy();
  });

  it("Shouldn't call sorting action", () => {
    const clickHandler = sinon.spy();

    const tree = shallow(<HeaderColumn label="test" sortable={false} />);
    tree.simulate('click');
    expect(clickHandler.called).toBeFalsy();
  });
});
