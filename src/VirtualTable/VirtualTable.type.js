import type {TableProps} from '../types';

type VirtualTableProps = TableProps & {
  startIndex: number,
  endIndex: number,
  setIndex: Function
};

export default VirtualTableProps;
