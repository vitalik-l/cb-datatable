import React from 'react';
import FixedHeaderTable from '../FixedHeaderTable/FixedHeaderTable';

class InfiniteTable extends React.Component {
  constructor(props) {
    super(props);
    this.tableBodyScrollHandler = this.tableBodyScrollHandler.bind(this);
  }

  componentDidMount() {
    this.fixedHeaderComponent.tableBodyContainer.addEventListener('scroll', this.tableBodyScrollHandler);
    this.loadRows();
  }

  loadRows() {
    const tableBodyContainerHeight = this.fixedHeaderComponent.tableBodyContainer.offsetHeight;
    const tableBodyHeight = this.fixedHeaderComponent.tableBody.offsetHeight;
    if (tableBodyContainerHeight > tableBodyHeight) {
      if (this.props.data.length !== this.props.displayData.length) {
        const avgRowHeight = tableBodyHeight / this.props.displayData.length;
        this.props.setCountRows(Math.ceil(tableBodyContainerHeight / avgRowHeight) * 2);
      }
    }
  }

  tableBodyScrollHandler({target}) {
    if (this.props.data.length === this.props.displayData.length) return;
    const {scrollHeight, scrollTop, offsetHeight} = target;
    const firePoint = Math.min(offsetHeight * 0.15, 50);
    if ((scrollTop + offsetHeight) + firePoint > scrollHeight) {
      if (!this.nextIsLoading) {
        const avgRowHeight = scrollHeight / this.props.displayData.length;
        const newCountRows = this.props.countRows + Math.max(Math.ceil(offsetHeight / avgRowHeight) * 2, 20);
        this.props.setCountRows(newCountRows);
        this.nextIsLoading = true;
      }
    } else {
      this.nextIsLoading = false;
    }
  }

  render() {
    return (
      <FixedHeaderTable {...this.props} ref={el => this.fixedHeaderComponent = el}/>
    );
  }
}

export default InfiniteTable;
