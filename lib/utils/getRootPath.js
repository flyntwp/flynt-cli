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

function isFileInPath(file, dir) {
  try {
    _fs2.default.statSync(_path2.default.join(dir, file));
    return true;
  } catch (e) {
    return false;
  }
}

function getRootPath() {
  var start = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : process.cwd();

  if (typeof start === 'string') {
    if (start[start.length - 1] !== _path2.default.sep) {
      start += _path2.default.sep;
    }
    start = start.split(_path2.default.sep);
  }
  if (!start.length) return false;
  start.pop();
  var dir = start.join(_path2.default.sep);
  if (isFileInPath('.flynt.json', dir)) return dir;
  if (isFileInPath('composer.json', dir)) return dir;
  if (isFileInPath('.git', dir)) return dir;
  return getRootPath(start);
}