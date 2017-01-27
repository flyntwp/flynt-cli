'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.prompts = exports.requirements = undefined;
exports.run = run;

var _executeCommand = require('../utils/executeCommand');

var _executeCommand2 = _interopRequireDefault(_executeCommand);

var _prompts = require('../prompts');

var allPrompts = _interopRequireWildcard(_prompts);

var _requirements = require('../requirements');

var allRequirements = _interopRequireWildcard(_requirements);

var _phpDependencies = require('../utils/phpDependencies');

var _phpDependencies2 = _interopRequireDefault(_phpDependencies);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var requirements = exports.requirements = [allRequirements.composer];

var prompts = exports.prompts = [allPrompts.projectName];

function run(answers) {
  var cmds = ['composer create-project "roots/bedrock=' + _phpDependencies2.default['roots/bedrock'] + '" ' + answers.projectName];
  return (0, _executeCommand2.default)(cmds).then(function () {
    process.chdir(answers.projectName);
  });
}