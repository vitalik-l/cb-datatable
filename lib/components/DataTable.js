'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _from = require('babel-runtime/core-js/array/from');

var _from2 = _interopRequireDefault(_from);

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _utils = require('../utils');

var _ = _interopRequireWildcard(_utils);

var _TableBody = require('./TableBody');

var _TableBody2 = _interopRequireDefault(_TableBody);

var _TableHeader = require('./TableHeader');

var _TableHeader2 = _interopRequireDefault(_TableHeader);

var _Pager = require('./Pager');

var _Pager2 = _interopRequireDefault(_Pager);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// type Props = {
//     data: DataT,
//     columns: Array<ColumnT>,
//     rowsPerPage: number,
//     orderBy: {[key: string]: string},
// 	className: string,
// 	fixedHeader: bool,
// 	displayAllData: bool,
// 	onClick: any,
// 	onRowRender: any
// };


// $FlowSkipCheck
var DataTable = function (_Component) {
    (0, _inherits3.default)(DataTable, _Component);

    function DataTable(props) {
        (0, _classCallCheck3.default)(this, DataTable);

        var _this = (0, _possibleConstructorReturn3.default)(this, (DataTable.__proto__ || (0, _getPrototypeOf2.default)(DataTable)).call(this, props));

        _this.containerScrollHandler = function (e) {
            console.log(e);
        };

        _this.selectPageHandler = function (e) {
            e.preventDefault();
            var toPage = e.target.value;
            _this.setState({ currentPage: +toPage });
        };

        _this.onHeaderAction = function (type, params) {
            switch (type) {
                case 'sort':
                    var newSorting = (0, _defineProperty3.default)({}, params.column.name, params.orderBy);
                    _this.setState({ orderBy: newSorting });
                    break;
                default:
                    break;
            }
        };

        _this.bodyScrollHandler = function (_ref) {
            var target = _ref.target;
            var scrollLeft = target.scrollLeft;

            if (_this.props.fixedHeader) {
                _this.tableHeaderComponent.table.style.transform = 'translate3d(' + -1 * scrollLeft + 'px, 0, 0)';
            }
            if (_this.props.displayAllData) {
                var scrollTop = target.scrollTop,
                    offsetHeight = target.offsetHeight,
                    scrollHeight = target.scrollHeight;

                var scrollPosToUpdate = scrollHeight * 0.15;

                if (scrollHeight - (scrollTop + offsetHeight) <= scrollPosToUpdate) {
                    _this.setPage(_this.state.currentPage + 1);
                }
            }
        };

        _this.adjustColumnsSize = function () {
            if (!_this.props.fixedHeader) return;
            // this.tableHeaderComponent.table.style.width = this.tableHeaderComponent.fixedContainer.offsetWidth + 'px';
            var headerColumns = _this.tableHeaderComponent.row.childNodes;
            // debugger;
            for (var j = 0; j < headerColumns.length; j++) {
                var bodyColumn = _this.tableBodyComponent.table.childNodes[0].childNodes[j],
                    headerColumn = headerColumns[j];
                // clear minWidth
                if (!!bodyColumn.style.width) {
                    bodyColumn.style.width = '';
                    bodyColumn.style.minWidth = '';
                    headerColumn.style.width = '';
                }
                var bodyColumnWidth = bodyColumn.getBoundingClientRect().width,
                    headerColumnWidth = headerColumn.getBoundingClientRect().width,
                    newWidth = bodyColumnWidth;
                // newWidth = Math.max(bodyColumnWidth, headerColumnWidth);
                headerColumn.style.width = newWidth + 'px';
                if (headerColumn.getBoundingClientRect().width > newWidth) {
                    newWidth = Math.max(bodyColumnWidth, headerColumnWidth);
                    headerColumn.style.width = newWidth + 'px';
                }
                bodyColumn.style.minWidth = newWidth + 'px';
                bodyColumn.style.width = newWidth + 'px';
            }
            // this.tableHeaderComponent.table.style.width = 'auto';
        };

        _this.previousClickHandler = function () {
            _this.setPage(_this.state.currentPage - 1);
        };

        _this.nextClickHandler = function () {
            _this.setPage(_this.state.currentPage + 1);
        };

        _this.state = {
            currentPage: 1,
            orderBy: props.orderBy,
            firstIndex: props.firstIndex
        };

        _this.setTableData({
            page: _this.state.currentPage,
            orderBy: _this.state.orderBy
        });
        _this.initPagesArray();
        return _this;
    }

    (0, _createClass3.default)(DataTable, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            if (this.props.fixedHeader) this.adjustColumnsSize();

            this.container.addEventListener('scroll', this.containerScrollHandler);
        }
    }, {
        key: 'componentWillUpdate',
        value: function componentWillUpdate(nextProps, nextState) {
            // console.time('datatable');
            var pageChanged = this.state.currentPage !== nextState.currentPage,
                sortingChanged = this.state.orderBy !== nextState.orderBy;

            if (pageChanged || sortingChanged) {
                this.setTableData({
                    data: nextProps.data,
                    page: pageChanged ? nextState.currentPage : null,
                    orderBy: sortingChanged ? nextState.orderBy : this.state.orderBy
                });
                return;
            }

            this.setTableData({ data: nextProps.data, orderBy: this.state.orderBy });
            this.initPagesArray(nextProps.data);
        }
    }, {
        key: 'componentDidUpdate',
        value: function componentDidUpdate() {
            if (this.props.fixedHeader) {
                // debugger;
                this.adjustColumnsSize();
            }
        }
    }, {
        key: 'getPagesCount',
        value: function getPagesCount(data) {
            var _data = data || this.props.data;
            return Math.ceil(_data.length / this.props.rowsPerPage);
        }
    }, {
        key: 'initPagesArray',
        value: function initPagesArray(data) {
            var _data = data || this.props.data;
            this.pages = (0, _from2.default)(new Array(this.getPagesCount(_data)), function (val, index) {
                return index + 1;
            });
        }
    }, {
        key: 'setTableDataByFirstIndex',
        value: function setTableDataByFirstIndex() {}
    }, {
        key: 'setTableData',
        value: function setTableData() {
            var _ref2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
                data = _ref2.data,
                page = _ref2.page,
                orderBy = _ref2.orderBy,
                rowsPerPage = _ref2.rowsPerPage,
                _ref2$displayAllData = _ref2.displayAllData,
                displayAllData = _ref2$displayAllData === undefined ? this.props.displayAllData : _ref2$displayAllData;

            var numberRows = rowsPerPage || this.props.rowsPerPage;
            var toPage = page || this.state.currentPage,
                indexStart = displayAllData ? 0 : (toPage - 1) * numberRows,
                dataToSlice = data || this.props.data;
            if (displayAllData) {
                numberRows = numberRows * toPage;
            }
            if (orderBy) {
                dataToSlice = _.orderBy(dataToSlice, orderBy);
            }
            this.tableData = dataToSlice.slice(indexStart, indexStart + numberRows);
            // console.log('set table data', this.props.data, this.tableData);
        }
    }, {
        key: 'setPage',
        value: function setPage(page) {
            if (page === 0 || page > this.pages.length) return;
            this.setState({ currentPage: page });
        }
    }, {
        key: 'loadDataByHeight',
        value: function loadDataByHeight() {
            if (!this.props.displayAllData) return;
            var bodyTable = this.tableBodyComponent.table;
            var bodyRow = this.tableBodyComponent.table.childNodes[0];
            var tableBodyContainer = this.tableBodyComponent.table;
            var rowHeigh = bodyRow.offsetHeight;
            var tableBodyContainerHeight = tableBodyContainer.offsetHeight;

            if (!bodyRow || !rowHeigh || bodyTable.offsetHeight > tableBodyContainer.offsetHeight) return;

            this.setPage(Math.ceil(Math.ceil(tableBodyContainerHeight / rowHeigh) / this.props.rowsPerPage));
        }
    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            // console.log('DataTable rendered', this.tableData.length, this.props.data.length);
            var pagesCount = this.getPagesCount();
            return _react2.default.createElement(
                'div',
                { className: (0, _classnames2.default)('data-table', this.props.className, { 'fixed-header': this.props.fixedHeader }), onClick: this.props.onClick, ref: function ref(_ref3) {
                        return _this2.container = _ref3;
                    } },
                _react2.default.createElement(
                    'div',
                    { className: 'table-container' },
                    _react2.default.createElement(
                        'div',
                        { className: (0, _classnames2.default)({ table: !this.props.fixedHeader }) },
                        _react2.default.createElement(_TableHeader2.default, {
                            columns: this.props.columns,
                            orderBy: this.state.orderBy,
                            onAction: this.onHeaderAction,
                            fixedHeader: this.props.fixedHeader,
                            ref: function ref(node) {
                                return _this2.tableHeaderComponent = node;
                            } }),
                        _react2.default.createElement(_TableBody2.default, {
                            data: this.tableData,
                            fixedHeader: this.props.fixedHeader,
                            columns: this.props.columns,
                            onRowRender: this.props.onRowRender,
                            scrollHandler: this.bodyScrollHandler,
                            ref: function ref(node) {
                                return _this2.tableBodyComponent = node;
                            } })
                    )
                ),
                this.props.displayPager && !this.props.displayAllData ? _react2.default.createElement(
                    'div',
                    { className: 'data-table-pager' },
                    _react2.default.createElement(
                        'button',
                        { className: (0, _classnames2.default)('previous', { hidden: this.state.currentPage === 1 }), onClick: this.previousClickHandler },
                        'Previous'
                    ),
                    _react2.default.createElement(
                        'div',
                        { className: 'pager' },
                        _react2.default.createElement(
                            'select',
                            { onChange: this.selectPageHandler, value: this.state.currentPage },
                            this.pages.map(function (pageNumber) {
                                return _react2.default.createElement(
                                    'option',
                                    { value: pageNumber, key: pageNumber },
                                    pageNumber
                                );
                            })
                        ),
                        _react2.default.createElement(
                            'span',
                            null,
                            ' / ',
                            pagesCount
                        )
                    ),
                    _react2.default.createElement(
                        'button',
                        { className: (0, _classnames2.default)('next', { hidden: pagesCount === 1 || pagesCount - this.state.currentPage === 0 }), onClick: this.nextClickHandler },
                        'Next'
                    )
                ) : null
            );
        }
    }]);
    return DataTable;
}(_react.Component);
// import type {ColumnT, DataT} from './Types';

// $FlowSkipCheck


DataTable.defaultProps = {
    rowsPerPage: 5,
    displayAllData: false,
    displayPager: true,
    firstIndex: 0
};
exports.default = DataTable;