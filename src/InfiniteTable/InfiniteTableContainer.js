import DataTableContainer from '../DataTableContainer';
import InfiniteTable from './InfiniteTable';

class InfiniteTableContainer extends DataTableContainer {
    static defaultProps = {
        ...DataTableContainer.defaultProps,
        TableComponent: InfiniteTable,
        PagerComponent: null
    };

    constructor(props) {
      super(props);
      this.state = {
        ...this.state,
        countRows: 3
      };
    }

    get tableProps() {
      return {
        ...super.tableProps,
        countRows: this.state.countRows,
        setCountRows: this.setCountRows
      }
    }

    get displayData() {
      return this.data.slice(0, this.state.countRows);
    }

    setCountRows = (value) => {
      if (this.state.countRows === value) return;
      this.setState({countRows: value});
    };

}

export default InfiniteTableContainer;
