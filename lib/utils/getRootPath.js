'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getRootPath;

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getRootPath(start = process.cwd()) {
  if (typeof start === 'string') {
    if (start[start.length - 1] !== _path2.default.sep) {
      start += _path2.default.sep;
    }
    start = start.split(_path2.default.sep);
  }
  if (!start.length) return false;
  start.pop();
  const dir = start.join(_path2.default.sep);
  if (_fs2.default.existsSync(_path2.default.join(dir, '.flynt.json'))) return dir;
  return getRootPath(start);
}