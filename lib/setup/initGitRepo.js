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

var requirements = exports.requirements = [allRequirements.git];

var prompts = exports.prompts = [allPrompts.gitRepo];

function run(answers) {
  var cmds = ['git init', 'git add .', 'git commit -m "chore(setup): initial commit"'];
  if (answers.gitRepo) {
    cmds = cmds.concat(['git remote add origin ' + answers.gitRepo, 'git push -u origin master']);
  }
  return (0, _exec2.default)(cmds);
}