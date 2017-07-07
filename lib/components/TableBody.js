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

var _TableRow = require('./TableRow');

var _TableRow2 = _interopRequireDefault(_TableRow);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TableBody = function (_Component) {
	(0, _inherits3.default)(TableBody, _Component);

	function TableBody(props) {
		(0, _classCallCheck3.default)(this, TableBody);

		var _this = (0, _possibleConstructorReturn3.default)(this, (TableBody.__proto__ || (0, _getPrototypeOf2.default)(TableBody)).call(this, props));

		_this.scrollHandler = function (e) {
			_this.props.scrollHandler && _this.props.scrollHandler(e);
		};

		_this.tableBodyNode = null;
		_this.table = null;
		return _this;
	}

	(0, _createClass3.default)(TableBody, [{
		key: 'componentDidMount',
		value: function componentDidMount() {
			if (this.props.fixedHeader) this.tableBodyNode.addEventListener('scroll', this.scrollHandler);
		}
	}, {
		key: 'render',
		value: function render() {
			var _this2 = this;

			var _props = this.props,
			    columns = _props.columns,
			    data = _props.data,
			    fixedHeader = _props.fixedHeader,
			    onRowRender = _props.onRowRender;

			var style = {};
			if (fixedHeader) {
				style.overflow = 'auto';
				style.willChange = 'transform';
			}
			// <div className="table-body-container" style={style} ref={node => this.tableBodyNode = node}>

			var Table = _react2.default.createElement(
				'div',
				{ className: (0, _classnames2.default)("data-table-body", { table: fixedHeader }), ref: function ref(node) {
						return _this2.table = node;
					} },
				data.map(function (row, i) {
					return _react2.default.createElement(_TableRow2.default, { columns: columns, row: row, onRowRender: onRowRender, key: i });
				})
			);

			var FixedTable = _react2.default.createElement(
				'div',
				{ className: 'table-body-container', style: style, ref: function ref(node) {
						return _this2.tableBodyNode = node;
					} },
				Table
			);

			return fixedHeader ? FixedTable : Table;
		}
	}]);
	return TableBody;
}(_react.Component);
// $FlowSkipCheck


exports.default = TableBody;