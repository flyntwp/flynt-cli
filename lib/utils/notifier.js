'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addData = addData;
exports.echo = echo;

var _log = require('./log');

var _log2 = _interopRequireDefault(_log);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const data = [];

function addData(singleData) {
  data.push(singleData);
}

function echo() {
  if (data.length) {
    (0, _log2.default)('\nSummary:\n');
    (0, _log2.default)(toString());
    clear();
  }
}

function toString() {
  return data.join('\n');
}

function clear() {
  data.length = 0;
}