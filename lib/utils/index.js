'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.orderBy = undefined;

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var orderBy = function orderBy(arr, _orderBy) {
    var keys = (0, _keys2.default)(_orderBy);
    if (!keys.length) return arr;
    return arr.sort(function (a, b) {
        var ca = a[keys[0]] === 'string' ? a[keys[0]].toLowerCase() : a[keys[0]],
            cb = b[keys[0]] === 'string' ? b[keys[0]].toLowerCase() : b[keys[0]],
            desc = _orderBy[keys[0]] === 'desc';
        if (ca > cb) {
            return desc ? -1 : 1;
        }
        if (ca < cb) {
            return desc ? 1 : -1;
        }
    });
};

exports.orderBy = orderBy;