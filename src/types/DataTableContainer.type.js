import type TableProps from './TableProps.type';
import type DataType from './Data.type';

/**
 * Main DataTable container props
 */
export type DataTableContainerProps = TableProps & {
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

  memoizeData: boolean,
  data: DataType
};

export type DataTableContainerState = {
  currentPage: number,
  orderBy: ?Object
};
