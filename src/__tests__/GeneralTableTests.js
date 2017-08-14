import React from 'react';
import {generateMockData, generateDataForColumns} from '../../testUtils';
import sinon from 'sinon';
import renderer from 'react-test-renderer';
import {shallow, mount} from 'enzyme';

export default function GeneralTableTests(TableComponent) {
  return () => {
    const {columns, data} = generateMockData({columnsNumber: 10, rowsNumber: 50});

    it('Wrapper div should have className from props', () => {
      const tree = shallow(
        <TableComponent columns={columns} data={data} className="test"/>
      );
      expect(tree.hasClass('test')).toBeTruthy();
    });

    it('onClick prop should fire', () => {
      const clickHandler = sinon.spy();

      const tree = shallow(
        <TableComponent columns={columns} data={data} onClick={clickHandler}/>
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
        <TableComponent columns={columns} data={data} renderLayout={tableLayout}/>
      );
      expect(tree.toJSON()).toMatchSnapshot();
    });

    it('orderBy asc', () => {
      const {columns, data} = generateMockData({columnsNumber: 1, rowsNumber: 3});
      const tree = shallow(<TableComponent columns={columns} data={data} orderBy={{column0: 'asc'}}/>);
      const instance = tree.instance();
      expect(instance.data).toEqual([
        {column0: 'column0 0'},
        {column0: 'column0 1'},
        {column0: 'column0 2'},
      ]);
    });

    it('orderBy asc Snapshot: should apply sort class and icon', () => {
      const {columns, data} = generateMockData({columnsNumber: 1, rowsNumber: 3});
      const tree = renderer.create(<TableComponent columns={columns} data={data} orderBy={{column0: 'asc'}}
                                                   PagerComponent={null}/>);
      expect(tree.toJSON()).toMatchSnapshot();
    });

    it('orderBy desc', () => {
      const {columns, data} = generateMockData({columnsNumber: 1, rowsNumber: 3});
      const tree = shallow(<TableComponent columns={columns} data={data} orderBy={{column0: 'desc'}}/>);
      const instance = tree.instance();
      expect(instance.data).toEqual([
        {column0: 'column0 2'},
        {column0: 'column0 1'},
        {column0: 'column0 0'},
      ]);
    });

    it('orderBy desc Snapshot: should apply sort class and icon', () => {
      const {columns, data} = generateMockData({columnsNumber: 1, rowsNumber: 3});
      const tree = renderer.create(<TableComponent columns={columns} data={data} orderBy={{column0: 'desc'}}
                                                   PagerComponent={null}/>);
      expect(tree.toJSON()).toMatchSnapshot();
    });

    it('Should update data when data from props is changed, orderBy should be applied', () => {
      let {columns, data} = generateMockData({columnsNumber: 1, rowsNumber: 3});
      const tree = shallow(<TableComponent columns={columns} data={data} orderBy={{column0: 'desc'}}
                                           PagerComponent={null}/>);
      const instance = tree.instance();
      const newData = generateMockData({columnsNumber: 1, rowsNumber: 4});
      data.push(newData.data[newData.data.length - 1]);
      tree.setProps({data: data});
      expect(instance.data[0]).toEqual({
        column0: 'column0 3'
      });
    });

    it('Columns visibility. Column 1 should be hidden', () => {
      let columns = [];
      for (let i = 0; i < 5; i++) {
        if (i === 1) {
          columns.push({
            name: 'column' + i,
            label: 'column' + i,
            visible: false
          });
          continue;
        }
        columns.push({
          name: 'column' + i,
          label: 'column' + i
        });
      }
      const data = generateDataForColumns(columns, 1);
      const tree = renderer.create(<TableComponent columns={columns} data={data} PagerComponent={null}/>);
      expect(tree.toJSON()).toMatchSnapshot();
    });

    it('Custom onSort event', () => {
      const defaultSorting = {column0: 'desc'};
      const onSort = sinon.spy();
      let {columns, data} = generateMockData({columnsNumber: 2, rowsNumber: 1});
      const tree = mount(<TableComponent columns={columns} data={data} orderBy={defaultSorting} onSort={onSort}/>);
      const HeaderColumns = tree.find('th');
      HeaderColumns.at(1).simulate('click');
      expect(onSort.called).toBeTruthy();
      expect(tree.props().orderBy).toEqual(defaultSorting);
    });

    it('onRowClick event', () => {
      const onRowClick = sinon.spy();
      let {columns, data} = generateMockData({columnsNumber: 1, rowsNumber: 1});
      const tree = mount(<TableComponent columns={columns} data={data} onRowClick={onRowClick}/>);
      const Rows = tree.find('tbody tr');
      Rows.at(0).simulate('click');
      expect(onRowClick.called).toBeTruthy();
    });
  }
}
