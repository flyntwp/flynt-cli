'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.prompts = exports.requirements = undefined;
exports.run = run;

var _exec = require('../utils/exec');

var _exec2 = _interopRequireDefault(_exec);

var _prompts = require('../prompts');

var allPrompts = _interopRequireWildcard(_prompts);

var _requirements = require('../requirements');

var allRequirements = _interopRequireWildcard(_requirements);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var requirements = exports.requirements = [allRequirements.git, allRequirements.yarn];

var prompts = exports.prompts = [allPrompts.projectName];

function run(answers) {
  var themePath = 'web/app/themes/' + answers.projectName;
  var cmds = ['git clone --depth=1 "git@github.com:bleech/wp-starter-theme.git" ' + themePath, 'cd ' + themePath, 'rm -rf .git', 'yarn'];
  return (0, _exec2.default)(cmds);
}