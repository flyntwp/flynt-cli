'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.prompts = exports.requirements = exports.runMessage = exports.description = undefined;
exports.run = run;

var _replaceInFiles = require('../utils/replaceInFiles');

var _replaceInFiles2 = _interopRequireDefault(_replaceInFiles);

var _prompts = require('../prompts');

var allPrompts = _interopRequireWildcard(_prompts);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const description = exports.description = 'replace project specific strings in theme files';

const runMessage = exports.runMessage = 'Replacing strings in theme files...';

const requirements = exports.requirements = [];

const prompts = exports.prompts = [allPrompts.themeName, allPrompts.wpHome];

function run(answers) {
  const replacements = getReplacements(answers);
  return (0, _replaceInFiles2.default)(replacements);
}

function getReplacements(answers) {
  return {
    [`web/app/themes/${answers.themeName}/gulpfile.js/config.js`]: {
      "const host = 'flynt.dev'": `const host = '${answers.wpHome}'`,
      "sourceRoot: '/app/themes/flynt-theme/'": `sourceRoot: 'app/themes/${answers.themeName}'`
    }
  };
}