'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const packageJsonPath = _path2.default.join(__dirname, '..', '..', 'package.json');
const packageJson = require(packageJsonPath);

const phpDependencies = packageJson.phpDependencies;

exports.default = phpDependencies;