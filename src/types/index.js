/**
 * Main DataTable container props
 */
type DataTableContainerProps = TableProps & {
  /**
   * number of rows per page
   */
  rowsPerPage: number,

  /**
   * add className to wrapper div
   */
  className: string,

  /**
   * click event. It applies to wrapper div
   */
  onClick: Function,

  /**
   * Table Component Class
   */
  TableComponent: Class<React$Component<*, *, *>>,

  /**
   * Pager Component Class
   */
  PagerComponent: Class<React$Component<*, *, *>>,

  /**
   * Render function. Can be used for organize your own main container layout
   */
  renderLayout: (Table: React$Element<*>, Pager: React$Element<*>) => {},
};

//----------------------------------------------------------
/**
 * Props for the Table component
 */
type TableProps = {
  /**
   *
   */
  data: Array<Object>,

  /**
   *
   */
  columns: Array<Object>,

  /**
   *
   */
  orderBy: Object,

  /**
   *
   */
  displayData: Array<Object>,

  /**
   *
   */
  setOrderBy: Function,

  /**
   * Display loader component
   */
  loading: bool

  /**
   * Render custom loader component
   */
  Loader: React$Element<*>,

  /**
   * Render function for table component. Can be used for organize your own table container layout
   */
  renderTableLayout: (Body: React$Element<*>, Header: React$Element<*>) => {},
};

//------------------------------------------
/**
 * data array type
 */
type DataType = {
  data: Array<Object>
};

export {
  TableProps,
  DataTableContainerProps,
  DataType
}
