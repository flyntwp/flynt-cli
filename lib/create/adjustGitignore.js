'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.prompts = exports.requirements = undefined;
exports.run = run;

var _replaceInFile = require('replace-in-file');

var _replaceInFile2 = _interopRequireDefault(_replaceInFile);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var requirements = exports.requirements = [];

var prompts = exports.prompts = [];

function run(answers) {
  return (0, _replaceInFile2.default)({
    files: '.gitignore',
    replace: /\.env\n/g,
    with: ''
  });
}