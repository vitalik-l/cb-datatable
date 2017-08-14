import DataTableContainer from '../DataTableContainer';
import FixedHeaderTable from './FixedHeaderTable';

class FixedHeaderTableContainer extends DataTableContainer {
  static defaultProps = {
    ...DataTableContainer.defaultProps,
    TableComponent: FixedHeaderTable
  };
}

export default FixedHeaderTableContainer;
