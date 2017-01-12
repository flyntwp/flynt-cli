'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getRootPath;

var _child_process = require('child_process');

var _child_process2 = _interopRequireDefault(_child_process);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getRootPath() {
  var rootPath = _child_process2.default.execSync('git rev-parse --show-toplevel').toString();
  return rootPath.substr(0, rootPath.length - 1);
}