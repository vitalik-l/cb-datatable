import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withKnobs, text, boolean, number } from '@storybook/addon-knobs';

import '../styles/table.scss';
import '../styles/wf.scss';
import {generateMockData} from './utils';
import DataTable from '../components/DataTable';
import TestInfinite from './tests/InfiniteDataTable';
import wfData from './data/data';
import * as COLUMNS from './Columns/TableColumnsSettings';

const WF_CLOSED_COLUMNS = [
    COLUMNS.TICKET,
    COLUMNS.SYMBOL,
    COLUMNS.AMOUNT,
    COLUMNS.PAYOUT,
    COLUMNS.ROI,
    COLUMNS.SL,
    COLUMNS.TP,
    COLUMNS.PIPS,
    COLUMNS.SPREAD,
    COLUMNS.PRICE_TP,
    COLUMNS.PRICE_SL,
    COLUMNS.TYPE,
    COLUMNS.PRICE_OPEN,
    COLUMNS.PRICE_CLOSE,
    COLUMNS.TIME_OPEN,
    COLUMNS.TIME_CLOSE,
    COLUMNS.DURATION,
    COLUMNS.CLOSED_PROFIT
];

const DEFAULT_TABLE = generateMockData({columnsNumber: 21, rowsNumber: 870});

const stories = storiesOf('DataTable', module);
stories.addDecorator(withKnobs);

stories.add('default', () => (
    <div className="content">
        <div className="datatable">
            <DataTable
                data={wfData}
                columns={WF_CLOSED_COLUMNS}
                rowsPerPage={20}/>
        </div>
    </div>
));

stories.add('fixed header', () => (
    <div className="content">
        <div className="datatable" style={{height: 350}}>
            <DataTable
                data={DEFAULT_TABLE.data}
                columns={DEFAULT_TABLE.columns}
                rowsPerPage={20}
                fixedHeader />
        </div>
    </div>
));

stories.add('fixed header small column', () => {
    const {columns, data} = generateMockData({columnsNumber: 21, rowsNumber: 870, columnName: 'c'});
    return (
        <div className="content">
            <div className="datatable" style={{height: 350}}>
                <DataTable
                    data={data}
                    columns={columns}
                    rowsPerPage={20}
                    fixedHeader />
            </div>
        </div>
    )
});

stories.add('fixed header small table', () => {
    const {columns, data} = generateMockData({columnsNumber: 4, rowsNumber: 870, columnName: 'c'});
    return (
        <div className="content">
            <div className="datatable" style={{height: 350}}>
                <DataTable
                    data={data}
                    columns={columns}
                    rowsPerPage={20}
                    fixedHeader/>
            </div>
        </div>
    );
});

stories.add('infinite without fixed header', () => (
    <div className="content">
        <div className="datatable" style={{height: 350}}>
            <TestInfinite />
        </div>
    </div>
));

stories.add('first index', () => (
    <div className="content">
        <div className="datatable" style={{height: 350}}>
            <DataTable
                data={DEFAULT_TABLE.data}
                columns={DEFAULT_TABLE.columns}
                firstIndex={number('first index', 0)}
                rowsPerPage={20}
            />
        </div>
    </div>
));
