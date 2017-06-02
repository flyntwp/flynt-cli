'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.prompts = exports.requirements = exports.runMessage = exports.description = undefined;
exports.run = run;

var _executeCommand = require('../utils/executeCommand');

var _executeCommand2 = _interopRequireDefault(_executeCommand);

var _prompts = require('../prompts');

var allPrompts = _interopRequireWildcard(_prompts);

var _requirements = require('../requirements');

var allRequirements = _interopRequireWildcard(_requirements);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const description = exports.description = 'initialize new git repo and push to origin';

const runMessage = exports.runMessage = 'Initializing git repo...';

const requirements = exports.requirements = [allRequirements.git];

const prompts = exports.prompts = [allPrompts.gitRepo];

function run(answers) {
  let cmds = ['git init', 'git add .', 'git commit -m "chore(setup): initial commit"'];
  if (answers.gitRepo) {
    cmds = cmds.concat([`git remote add origin ${answers.gitRepo}`, 'git push -u origin master']);
  }
  return (0, _executeCommand2.default)(cmds);
}