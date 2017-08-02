type DataTableContainerProps = {
  /**
   * data
   */
  data: Array<Object>,

  /**
   * number of rows per page
   */
  rowsPerPage: number,

  /**
   * field name to sorting data
   */
  orderBy: Object,

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
  PagerComponent: Class<React$Component<*, *, *>>
};

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
};

export {
  TableProps,
  DataTableContainerProps
}
