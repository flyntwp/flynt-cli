'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = replaceInFiles;

var _replaceInFile = require('replace-in-file');

var _replaceInFile2 = _interopRequireDefault(_replaceInFile);

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// the argument replacements has to be of the form:
// {
//   filePath1: {
//     search1: 'replace1',
//     search2: 'replace2',
//     ...
//   }, ...
// }
function replaceInFiles(replacements) {
  return _bluebird2.default.all(Object.keys(replacements).map(function (file) {
    var searchFor = Object.keys(replacements[file]);
    var replaceWith = searchFor.map(function (sf) {
      return replacements[file][sf];
    });
    return (0, _replaceInFile2.default)({
      files: file,
      replace: searchFor,
      with: replaceWith
    });
  }));
}