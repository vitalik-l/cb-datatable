import type ColumnType from './Column.type';

type RowProps = {
  row: Object,
  columns: Array<ColumnType>,
  className: any,
  onRowClick: Function
}

export default RowProps;
