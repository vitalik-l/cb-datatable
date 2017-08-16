// @flow
import DataTableContainer from '../DataTableContainer';
import VirtualTable from './VirtualTable';
import type {DataTableContainerProps, DataType} from '../types';
import type VirtualTableProps from './VirtualTable.type';

class VirtualTableContainer extends DataTableContainer {
  static defaultProps = {
    ...DataTableContainer.defaultProps,
    TableComponent: VirtualTable,
    PagerComponent: null
  };

  constructor(props: DataTableContainerProps) {
    super(props);
    this.state = {
      ...this.state,
      startIndex: 0,
      endIndex: 1
    };
  }

  get tableProps(): VirtualTableProps {
    return {
      ...super.tableProps,
      startIndex: this.state.startIndex,
      endIndex: this.state.endIndex,
      setIndex: this.setIndex
    }
  }

  get displayData(): DataType {
    return this.data.slice(this.state.startIndex, this.state.endIndex);
  }

  setIndex = (start: number, end: number) => {
    if (start >= this.props.data.length) return;
    this.setState({
      startIndex: Math.max(start, 0),
      endIndex: Math.min(end, this.data.length)
    })
  }
}

export default VirtualTableContainer;
