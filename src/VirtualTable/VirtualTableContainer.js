import DataTableContainer from '../DataTableContainer';
import VirtualTable from './VirtualTable';

class VirtualTableContainer extends DataTableContainer {
  static defaultProps = {
    ...DataTableContainer.defaultProps,
    TableComponent: VirtualTable,
    PagerComponent: null
  };
}

export default VirtualTableContainer;
