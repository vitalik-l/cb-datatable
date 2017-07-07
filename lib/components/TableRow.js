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

var TableRow = function (_Component) {
	(0, _inherits3.default)(TableRow, _Component);

	function TableRow(props) {
		(0, _classCallCheck3.default)(this, TableRow);

		//
		var _this = (0, _possibleConstructorReturn3.default)(this, (TableRow.__proto__ || (0, _getPrototypeOf2.default)(TableRow)).call(this, props));

		_this.tableRowNode = null;
		return _this;
	}

	(0, _createClass3.default)(TableRow, [{
		key: 'componentDidMount',
		value: function componentDidMount() {
			this.props.onRowRender && this.props.onRowRender(this.tableRowNode, this.props.row);
		}
	}, {
		key: 'componentDidUpdate',
		value: function componentDidUpdate() {
			this.props.onRowRender && this.props.onRowRender(this.tableRowNode, this.props.row);
		}
	}, {
		key: 'render',
		value: function render() {
			var _this2 = this;

			return _react2.default.createElement(
				'div',
				{ className: 'table-row', ref: function ref(node) {
						return _this2.tableRowNode = node;
					} },
				this.props.columns.map(function (column, i) {
					var style = {};
					if (column.minWidth) style.minWidth = column.minWidth;
					return _react2.default.createElement(
						'div',
						{ className: (0, _classnames2.default)('table-cell', column.className), style: style, key: i },
						_react2.default.createElement(
							'div',
							{ className: (0, _classnames2.default)('table-cell-content') },
							column.renderer ? _react2.default.createElement(column.renderer, { column: column, row: _this2.props.row, rowNode: _this2.tableRowNode }) : _this2.props.row[column.name]
						)
					);
				})
			);
		}
	}]);
	return TableRow;
}(_react.Component);

exports.default = TableRow;