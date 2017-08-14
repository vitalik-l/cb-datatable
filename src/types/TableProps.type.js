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
  columns: Array<Object>,

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
   * Render function for table component. Can be used for organize your own table container layout
   */
  renderTableLayout: (Body: React$Element<*>, Header: React$Element<*>) => {},

  /**
   * @private
   */
  setOrderBy: Function,
};

export default TableProps;
