import React from 'react';
import {generateMockData} from '../../testUtils';
import sinon from 'sinon';
import renderer from 'react-test-renderer';
import {shallow} from 'enzyme';
import DataTable from '../';

describe('DataTable', () => {
  const {columns, data} = generateMockData({columnsNumber: 10, rowsNumber: 50});

  it('Wrapper div should have className from props', () => {
    const tree = shallow(
      <DataTable columns={columns} data={data} className="test" />
    );
    expect(tree.hasClass('test')).toBeTruthy();
  });

  it('onClick prop should fire', () => {
    const clickHandler = sinon.spy();

    const tree = shallow(
      <DataTable columns={columns} data={data} onClick={clickHandler} />
    );
    tree.simulate('click');
    expect(clickHandler.called).toBeTruthy();
  });

  it('should apply renderLayout prop, it displays only table', () => {
    const {columns, data} = generateMockData({columnsNumber: 1, rowsNumber: 1});
    const tableLayout = (Table, Pager) => {
      return Table;
    };
    const tree = renderer.create(
      <DataTable columns={columns} data={data} renderLayout={tableLayout} />
    );
    expect(tree.toJSON()).toMatchSnapshot();
  });

  it('orderBy asc', () => {
    const {columns, data} = generateMockData({columnsNumber: 1, rowsNumber: 3});
    const tree = shallow(<DataTable columns={columns} data={data} orderBy={{column0: 'asc'}} />);
    const instance = tree.instance();
    expect(instance.data).toEqual([
      {column0: 'column0 0'},
      {column0: 'column0 1'},
      {column0: 'column0 2'},
    ]);
  });

  it('orderBy asc Snapshot: should apply sort class and icon', () => {
    const {columns, data} = generateMockData({columnsNumber: 1, rowsNumber: 3});
    const tree = renderer.create(<DataTable columns={columns} data={data} orderBy={{column0: 'asc'}} PagerComponent={null}/>);
    expect(tree.toJSON()).toMatchSnapshot();
  });

  it('orderBy desc', () => {
    const {columns, data} = generateMockData({columnsNumber: 1, rowsNumber: 3});
    const tree = shallow(<DataTable columns={columns} data={data} orderBy={{column0: 'desc'}} />);
    const instance = tree.instance();
    expect(instance.data).toEqual([
      {column0: 'column0 2'},
      {column0: 'column0 1'},
      {column0: 'column0 0'},
    ]);
  });

  it('orderBy desc Snapshot: should apply sort class and icon', () => {
    const {columns, data} = generateMockData({columnsNumber: 1, rowsNumber: 3});
    const tree = renderer.create(<DataTable columns={columns} data={data} orderBy={{column0: 'desc'}} PagerComponent={null}/>);
    expect(tree.toJSON()).toMatchSnapshot();
  });

  it('Should update data when data from props is changed, orderBy should be applied', () => {
    let {columns, data} = generateMockData({columnsNumber: 1, rowsNumber: 3});
    const tree = shallow(<DataTable columns={columns} data={data} orderBy={{column0: 'desc'}} PagerComponent={null}/>);
    const instance = tree.instance();
    const newData = generateMockData({columnsNumber: 1, rowsNumber: 4});
    data.push(newData.data[newData.data.length - 1]);
    tree.setProps({data: data});
    expect(instance.data[0]).toEqual({
      column0: 'column0 3'
    });
  });
});
