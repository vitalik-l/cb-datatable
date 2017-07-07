'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TableHeader = function (_Component) {
    (0, _inherits3.default)(TableHeader, _Component);

    function TableHeader(props) {
        (0, _classCallCheck3.default)(this, TableHeader);

        var _this = (0, _possibleConstructorReturn3.default)(this, (TableHeader.__proto__ || (0, _getPrototypeOf2.default)(TableHeader)).call(this, props));

        _this.getSortingValue = function (column) {
            if (!_this.props.orderBy) return null;
            return _this.props.orderBy[column.name];
        };

        _this.columnClickHandler = function (column, currentSorting) {
            if (!column.sortable) return;
            var newSorting = currentSorting === 'asc' ? 'desc' : 'asc';
            _this.props.onAction('sort', { column: column, orderBy: newSorting });
        };

        _this.table = null;
        return _this;
    }

    (0, _createClass3.default)(TableHeader, [{
        key: 'render',
        value: function render() {
            var _this2 = this;

            var fixedHeader = this.props.fixedHeader;


            var HeaderRow = _react2.default.createElement(
                'div',
                { className: (0, _classnames2.default)('data-table-header', { table: fixedHeader }), ref: function ref(node) {
                        return _this2.table = node;
                    } },
                _react2.default.createElement(
                    'div',
                    { className: 'table-row', ref: function ref(node) {
                            return _this2.row = node;
                        } },
                    this.props.columns.map(function (column, i) {
                        var sorting = _this2.getSortingValue(column),
                            sortingSign = '',
                            style = {};
                        if (sorting === 'desc') {
                            sortingSign = '▼';
                        } else if (sorting === 'asc') {
                            sortingSign = '▲';
                        }
                        if (column.minWidth) {
                            style.minWidth = column.minWidth;
                        }
                        return _react2.default.createElement(
                            'div',
                            { className: (0, _classnames2.default)('column-header', column.className, { sortable: column.sortable, 'sort-ascending': sorting === 'asc', 'sort-descending': sorting === 'desc' }),
                                style: style,
                                onClick: function onClick() {
                                    _this2.columnClickHandler(column, sorting);
                                },
                                key: column.name },
                            column.label,
                            ' ' + sortingSign
                        );
                    })
                )
            );

            var FixedHeaderRow = _react2.default.createElement(
                'div',
                { className: 'table-header-container', ref: function ref(node) {
                        return _this2.fixedContainer = node;
                    } },
                _react2.default.createElement(
                    'div',
                    { style: { overflow: 'hidden' } },
                    _react2.default.createElement(
                        'div',
                        { style: { width: 9000 } },
                        HeaderRow
                    )
                )
            );

            return fixedHeader ? FixedHeaderRow : HeaderRow;
        }
    }]);
    return TableHeader;
}(_react.Component);

exports.default = TableHeader;