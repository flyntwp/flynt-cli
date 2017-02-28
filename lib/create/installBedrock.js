'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.notInRootFolder = exports.prompts = exports.requirements = undefined;
exports.run = run;

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

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
  var installInPlace = currentDirIsProjectDir(answers.projectName);
  if (installInPlace) {
    var cmds = ['rm .flynt.json', 'composer create-project "roots/bedrock=' + _phpDependencies2.default['roots/bedrock'] + '" .'];
    return (0, _executeCommand2.default)(cmds);
  } else {
    var _cmds = ['composer create-project "roots/bedrock=' + _phpDependencies2.default['roots/bedrock'] + '" ' + answers.projectName];
    return (0, _executeCommand2.default)(_cmds).then(function () {
      process.chdir(answers.projectName);
    });
  }
}

function currentDirIsProjectDir(projectName) {
  var cwd = process.cwd();
  var currentPathBasename = _path2.default.basename(cwd);

  if (currentPathBasename === projectName) {
    var files = _fs2.default.readdirSync(cwd);
    if (!files.length || files.length === 1 && files[0] === '.flynt.json') {
      return true;
    }
  }

  return false;
}

var notInRootFolder = exports.notInRootFolder = true;