import type Column from './Column.type';
/**
 * Props for the Table component
 */
type TableProps = {
  /**
   * @public
   */
  data: Array<Object>,

  /**
   * @public
   */
  columns: Array<Column>,

  /**
   * @public
   */
  orderBy: Object,

  /**
   *
   */
  displayData: Array<Object>,

  /**
   * @public
   * Display loader component
   */
  loading: bool

  /**
   * @public
   * Render custom loader component
   */
  Loader: React$Element<*>,

  /**
   * @public
   * Render function for table component. Can be used for organize your own table container layout
   */
  renderTableLayout: (Body: React$Element<*>, Header: React$Element<*>) => {},

  /**
   * @public
   * Row click event
   */
  onRowClick: Function,

  /**
   * @public
   * onSort event
   */
  onSort: Function,

  /**
   * @private
   */
  setOrderBy: Function,
};

export default TableProps;
