type Column = {
  /**
   * @public
   */
  name: string,

  /**
   * @public
   */
  sortable: boolean,

  /**
   * @public
   */
  label: any,

  /**
   * @public
   */
  orderBy: Object,

  /**
   * @public
   */
  visible: bool

  /**
   * @public
   */
  className: string,

  /**
   * @public
   */
  setOrderBy: Function
};

export default Column;
