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

        this.tableBodyContainer.addEventListener('scroll', this.tableBodyScrollHandler);
        this.adjustHeader();
    }

    tableBodyScrollHandler = ({target}) => {
        const {scrollLeft} = target;
        this.tableHeaderContainer.style.transform = 'translate3d(' + (-1 * scrollLeft) + 'px, 0, 0)';
    };

    adjustHeader() {
        if (!this.tableBody.rows.length) return;
        const tableBodyCells = this.tableBody.rows[0].cells;

        for (let i = 0; i < tableBodyCells.length; i++) {
            const tableBodyCellWidth = tableBodyCells[i].getBoundingClientRect().width;
            this.tableHeader.rows[0].cells[i].style['min-width'] = tableBodyCellWidth + 'px';
        }
    }
}

export default FixedHeaderHelper;