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

var Pager = function (_Component) {
    (0, _inherits3.default)(Pager, _Component);

    function Pager() {
        var _ref;

        var _temp, _this, _ret;

        (0, _classCallCheck3.default)(this, Pager);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = Pager.__proto__ || (0, _getPrototypeOf2.default)(Pager)).call.apply(_ref, [this].concat(args))), _this), _this.selectPageHandler = function (e) {
            e.preventDefault();
            var toPage = e.target.value;
            _this.props.selectPageHandler && _this.props.selectPageHandler(toPage);
        }, _this.previousClickHandler = function () {
            _this.props.selectPageHandler && _this.props.selectPageHandler('previous');
        }, _this.nextClickHandler = function () {
            _this.props.selectPageHandler && _this.props.selectPageHandler('next');
        }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
    }

    (0, _createClass3.default)(Pager, [{
        key: 'render',
        value: function render() {
            var _props = this.props,
                currentPage = _props.currentPage,
                pagesCount = _props.pagesCount,
                pages = _props.pages;

            return _react2.default.createElement(
                'div',
                { className: 'data-table-pager' },
                _react2.default.createElement(
                    'button',
                    { className: (0, _classnames2.default)('previous', { hidden: currentPage === 1 }), onClick: this.previousClickHandler },
                    'Previous'
                ),
                _react2.default.createElement(
                    'div',
                    { className: 'pager' },
                    _react2.default.createElement(
                        'select',
                        { onChange: this.selectPageHandler, value: currentPage },
                        pages.map(function (pageNumber) {
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
                    { className: (0, _classnames2.default)('next', { hidden: pagesCount === 1 || pagesCount - currentPage === 0 }), onClick: this.nextClickHandler },
                    'Next'
                )
            );
        }
    }]);
    return Pager;
}(_react.Component);

exports.default = Pager;