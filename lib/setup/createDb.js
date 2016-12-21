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

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var requirements = exports.requirements = [allRequirements.mysql];

var prompts = exports.prompts = [allPrompts.dbHost, allPrompts.dbRootUser, allPrompts.dbRootPassword, allPrompts.dbName, allPrompts.dbUser, allPrompts.dbPassword];

function run(answers) {
  var cmds = ['mysql --host=' + answers.dbHost + ' --user=' + answers.dbRootUser + ' --password=' + answers.dbRootPassword + ' -e       "CREATE DATABASE IF NOT EXISTS ' + answers.dbName + ';       CREATE USER \'' + answers.dbUser + '\'@\'' + answers.dbHost + '\' IDENTIFIED BY \'' + answers.dbPassword + '\';       GRANT ALL PRIVILEGES ON ' + answers.dbName + ' . * TO \'' + answers.dbUser + '\'@\'' + answers.dbHost + '\';       FLUSH PRIVILEGES;"'];
  return (0, _executeCommand2.default)(cmds);
}