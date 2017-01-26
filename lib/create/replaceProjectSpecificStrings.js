'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.prompts = exports.requirements = undefined;
exports.run = run;

var _replaceInFile = require('replace-in-file');

var _replaceInFile2 = _interopRequireDefault(_replaceInFile);

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _prompts = require('../prompts');

var allPrompts = _interopRequireWildcard(_prompts);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var requirements = exports.requirements = [];

var prompts = exports.prompts = [allPrompts.projectName, allPrompts.wpHome];

function run(answers) {
  var replacements = getReplacements(answers);
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

function getReplacements(answers) {
  return _defineProperty({}, 'web/app/themes/' + answers.projectName + '/gulpfile.js/config.js', {
    "const host = 'flynt.dev'": 'const host = \'' + answers.wpHome + '\'',
    "sourceRoot: '/app/themes/flynt-theme/'": 'sourceRoot: \'app/themes/' + answers.projectName + '\''
  });
}