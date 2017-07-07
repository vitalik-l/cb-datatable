import React, {Component} from 'react';
import DataTable from '../../components/DataTable';
import {generateMockData} from '../utils';

const TABLE_DATA = generateMockData({columnsNumber: 13, rowsNumber: 10233});

class TestInfinite extends Component {
    render() {
        return (
            <DataTable
                columns={TABLE_DATA.columns}
                data={TABLE_DATA.data}
                rowsPerPage={25}
            />
        )
    }
}

export default TestInfinite;