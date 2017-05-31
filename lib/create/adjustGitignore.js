'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.prompts = exports.requirements = exports.description = undefined;
exports.run = run;

var _replaceInFiles = require('../utils/replaceInFiles');

var _replaceInFiles2 = _interopRequireDefault(_replaceInFiles);

var _addLinesToFiles = require('../utils/addLinesToFiles');

var _addLinesToFiles2 = _interopRequireDefault(_addLinesToFiles);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const description = exports.description = 'add paths to gitignore';

const requirements = exports.requirements = [];

const prompts = exports.prompts = [];

function run(answers) {
  return (0, _replaceInFiles2.default)(getReplacements()).then(() => (0, _addLinesToFiles2.default)(getLinesToAdd()));
}

function getReplacements() {
  return {
    '.gitignore': {
      '.env\n': '',
      'web/.htaccess\n': ''
    }
  };
}

function getLinesToAdd() {
  return {
    '.gitignore': {
      lines: ['/tmp/', '/backup/'],
      prepend: true
    }
  };
}