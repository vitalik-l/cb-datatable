import type ColumnType from './Column.type';

type RowProps = {
  row: Object,
  columns: Array<ColumnType>,
  onRowClick: Function
}

export default RowProps;
