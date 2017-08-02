import React from 'react';

const BodyRowRenderer = (row, columns) => {
    return [
        <tr>
            {columns.map((col, i) => <td key={i}>{row[col.name]}</td>)}
        </tr>
    ]
};

function SimpleTable({data, columns}) {
    return (
        <div>
            <table>
                <thead>
                    <tr>
                        {columns.map((col, i) => <td key={i}>{col.label}</td>)}
                    </tr>
                </thead>
                <tbody>
                {data.map((row, i) => (
                    BodyRowRenderer(row, columns).map(rowElement => rowElement)
                    )
                )}
                </tbody>
            </table>
        </div>
    );
}

class FixedHeaderTable extends React.Component {
    componentDidMount() {
        this.tableBodyContainer.addEventListener('scroll', this.tableBodyScrollHandler);
        this.adjustHeader();
    }

    componentDidUpdate() {
        this.adjustHeader();
    }

    adjustHeader() {
        const tableBodyCells = this.tableBody.rows[0].cells;

        for (let i = 0; i < tableBodyCells.length; i++) {
            const tableBodyCellWidth = tableBodyCells[i].getBoundingClientRect().width;
            this.tableHeader.rows[0].cells[i].style['min-width'] = tableBodyCellWidth + 'px';
        }
    }

    tableBodyScrollHandler = ({target}) => {
        const {scrollLeft} = target;
        this.tableHeaderContainer.style.transform = 'translate3d(' + (-1 * scrollLeft) + 'px, 0, 0)'
    };

    render() {
        const {data, columns} = this.props;
        return (
            <div className="fixed-header">
                <div className="table-header" ref={el => this.tableHeaderContainer = el}>
                    <table ref={el => this.tableHeader = el}>
                        <thead>
                        <tr>
                            {columns.map(col => <td>{col.label}</td>)}
                        </tr>
                        </thead>
                    </table>
                </div>
                <div className="table-body" ref={el => this.tableBodyContainer = el}>
                    <table ref={el => this.tableBody = el}>
                        <tbody>
                            {data.map(row => (
                                <tr>
                                    {columns.map(col => <td>{row[col.name]}</td>)}
                                </tr>)
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

class InfiniteTable extends React.Component {
    nextIsLoading = false;

    constructor(props) {
        super(props);
        this.state = {
            tableData: this.sliceData(props.data, 20)
        };
    }

    componentDidMount() {
        this.tableBodyContainer.addEventListener('scroll', this.tableBodyScrollHandler);
        this.adjustHeader();
    }

    componentWillReceiveProps(nextProps) {
        this.setTableData(nextProps.data, 20);
    }

    componentDidUpdate() {
        this.adjustHeader();
    }

    adjustHeader() {
        if (!this.tableBody.rows.length) return;
        const tableBodyCells = this.tableBody.rows[0].cells;

        for (let i = 0; i < tableBodyCells.length; i++) {
            const tableBodyCellWidth = tableBodyCells[i].getBoundingClientRect().width;
            this.tableHeader.rows[0].cells[i].style['min-width'] = tableBodyCellWidth + 'px';
        }
    }

    sliceData(data, indexEnd) {
        return data.slice(0, indexEnd);
    }

    setTableData(data, indexEnd) {
        this.setState({
            tableData: this.sliceData(data, indexEnd)
        });
    }

    loadNext(rowsNumber) {
        this.setTableData(this.props.data, this.state.tableData.length + rowsNumber);
    }

    tableBodyScrollHandler = ({target}) => {
        const {scrollLeft, scrollHeight, scrollTop, offsetHeight} = target;
        this.tableHeaderContainer.style.transform = 'translate3d(' + (-1 * scrollLeft) + 'px, 0, 0)';

        const firePoint = Math.min(offsetHeight * 0.15, 50);
        if ((scrollTop + offsetHeight) + firePoint > scrollHeight) {
            if (!this.nextIsLoading) {
                const avgRowHeight = scrollHeight / this.state.tableData.length;
                this.loadNext(Math.max(Math.ceil(offsetHeight / avgRowHeight) * 2, 20));
                this.nextIsLoading = true;
            }
        } else {
            this.nextIsLoading = false;
        }
    };

    render() {
        const {columns} = this.props;
        const data = this.state.tableData;
        return (
            <div className="fixed-header">
                <div className="table-header" ref={el => this.tableHeaderContainer = el}>
                    <table ref={el => this.tableHeader = el}>
                        <thead>
                        <tr>
                            {columns.map((col, i) => <td key={i}>{col.label}</td>)}
                        </tr>
                        </thead>
                    </table>
                </div>
                <div className="table-body" ref={el => this.tableBodyContainer = el}>
                    <table ref={el => this.tableBody = el}>
                        <tbody>
                        {data.map((row, i) => (
                            <tr key={i}>
                                {columns.map((col, i) => <td key={i}>{row[col.name]}</td>)}
                            </tr>)
                        )}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

export {
    SimpleTable,
    FixedHeaderTable,
    InfiniteTable
};