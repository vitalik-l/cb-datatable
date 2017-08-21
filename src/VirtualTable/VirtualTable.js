// @flow
import React, {Component} from 'react';
import FixedHeaderTable from '../FixedHeaderTable/FixedHeaderTable';
import type VirtualTableProps from './VirtualTable.type';

class VirtualTable extends Component<VirtualTableProps> {
  props: VirtualTableProps;
  tableComponent: FixedHeaderTable;
  transformY: number;
  tableLayout: Function;
  scrollArea: any;
  fullArea: any;

  constructor(props: VirtualTableProps) {
    super(props);
    this.tableLayout = this.tableLayout.bind(this);

    this.transformY = 0;
  }

  componentDidMount() {
    this.scrollArea.addEventListener('scroll', this.tableBodyScrollHandler);
    // set full area height by data length
    this.setFullHeight(this.props.data.length * this.avgRowHeight);
    this.initRows();
  }

  componentDidUpdate() {
    this.transformY = this.props.startIndex * this.avgRowHeight;
    // if height of loaded table + offset top more than full container height, update full container height
    const innerTableHeight = this.transformY + this.tableBodyContainerHeight;
    if (
      innerTableHeight > this.fullArea.offsetHeight ||
      (this.props.data.length === this.props.endIndex + 1 &&
      this.fullArea.offsetHeight > innerTableHeight)
    )
    {
      this.setFullHeight(innerTableHeight);
    }

    // apply transform for table
    if (this.tableComponent.tableBodyContainer) {
      this.tableComponent.tableBodyContainer.style.transform = `translate3d(0, ${this.transformY}px, 0)`;
    }
  }

  get tableBodyContainerHeight(): number {
    if (this.tableComponent.tableBodyContainer) return this.tableComponent.tableBodyContainer.offsetHeight;
    return 0;
  }

  get tableBodyHeight(): number {
    if (this.tableComponent.tableBody) return this.tableComponent.tableBody.offsetHeight;
    return 0;
  }

  get avgRowHeight(): number {
    const tableBodyHeight = this.tableBodyHeight;
    return tableBodyHeight / this.props.displayData.length;
  }

  initRows() {
    if (this.scrollArea.offsetHeight > this.tableBodyContainerHeight) {
      const displayedEndIndex = Math.floor(this.scrollArea.offsetHeight / this.avgRowHeight);
      this.props.setIndex(0, displayedEndIndex + 2);
    }
  }

  setFullHeight(value: number) {
    if (this.fullArea) {
      this.fullArea.style.height = `${value}px`;
      this.fullArea.style.maxHeight = `${value}px`;
    }
  }


  tableBodyScrollHandler = (e: any) => {
    // scroll horizontal
    const {target} = e;
    const {scrollLeft} = target;

    if (this.tableComponent.tableHeaderContainer) {
      this.tableComponent.tableHeaderContainer.style.transform = 'translate3d(' + (-1 * scrollLeft) + 'px, 0, 0)';
    }

    // scroll vertical
    if (target.scrollTop + this.scrollArea.offsetHeight > this.tableBodyContainerHeight + this.transformY) {
      // load down
      const displayedStartIndex = Math.floor(target.scrollTop / this.avgRowHeight);
      const displayedEndIndex = displayedStartIndex + Math.floor(this.scrollArea.offsetHeight / this.avgRowHeight);
      this.props.setIndex(displayedStartIndex - 2, displayedEndIndex + 2);
    } else if (target.scrollTop < this.transformY) {
      // load up
      const displayedStartIndex = Math.floor(target.scrollTop / this.avgRowHeight);
      const displayedEndIndex = displayedStartIndex + Math.floor(this.scrollArea.offsetHeight / this.avgRowHeight);
      this.props.setIndex(displayedStartIndex - 2, displayedEndIndex + 2);
    }
  };

  tableLayout({Body, Header, Loader}: {Body: React$Element<*>, Header: React$Element<*>, Loader: React$Element<*>}) {
    return (
      <div className="fixed-header-table virtual-data-table">
        {Header}
        {Loader}
        <div className="virtual-data-table__scroll-area" ref={elem => this.scrollArea = elem}>
          <div className="virtual-data-table__full-area" ref={elem => this.fullArea = elem}>
            {Body}
          </div>
        </div>
      </div>
    );
  }

  render() {
    return (
      <FixedHeaderTable
        {...this.props}
        renderTableLayout={this.tableLayout}
        ref={el => this.tableComponent = el}
      />
    );
  }
}

export default VirtualTable;
