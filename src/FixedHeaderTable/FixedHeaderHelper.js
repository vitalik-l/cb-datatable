class FixedHeaderHelper {
  constructor({
      tableBodyContainer,
      tableBody,
      tableHeaderContainer,
      tableHeader
  }) {
      this.tableBodyContainer = tableBodyContainer;
      this.tableBody = tableBody;
      this.tableHeaderContainer = tableHeaderContainer;
      this.tableHeader = tableHeader;

      this.tableBodyContainer && this.tableBodyContainer.addEventListener('scroll', this.tableBodyScrollHandler);
      this.adjustColumns();
  }

  tableBodyScrollHandler = ({target}) => {
      const {scrollLeft} = target;
      this.tableHeaderContainer.style.transform = 'translate3d(' + (-1 * scrollLeft) + 'px, 0, 0)';
  };

  adjustColumns() {
    if (!this.tableBody || !this.tableBody.rows.length) return;
    const tableBodyCells = this.tableBody.rows[0].cells;

    for (let i = 0; i < tableBodyCells.length; i++) {
      const tableHeaderCell = this.tableHeader.rows[0].cells[i];
      const tableBodyCellWidth = tableBodyCells[i].getBoundingClientRect().width;
      const tableHeaderCellWidth = tableHeaderCell.getBoundingClientRect().width;
      if (tableBodyCellWidth === tableHeaderCellWidth) continue;
      const newWidth = Math.max(tableBodyCellWidth, tableHeaderCellWidth);
      this.tableHeader.rows[0].cells[i].style['min-width'] = newWidth + 'px';
      tableBodyCells[i].style['min-width'] = newWidth + 'px';
    }
  }
}

export default FixedHeaderHelper;
