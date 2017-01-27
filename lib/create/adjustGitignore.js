'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.prompts = exports.requirements = undefined;
exports.run = run;

var _replaceInFiles = require('../utils/replaceInFiles');

var _replaceInFiles2 = _interopRequireDefault(_replaceInFiles);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var requirements = exports.requirements = [];

var prompts = exports.prompts = [];

function run(answers) {
  return (0, _replaceInFiles2.default)(getReplacements());
}

function getReplacements() {
  return {
    '.gitignore': {
      '.env\n': ''
    }
  };
}