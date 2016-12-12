'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.prompts = exports.requirements = undefined;
exports.run = run;

var _child_process = require('child_process');

var _child_process2 = _interopRequireDefault(_child_process);

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _prompts = require('../prompts');

var allPrompts = _interopRequireWildcard(_prompts);

var _requirements = require('../requirements');

var allRequirements = _interopRequireWildcard(_requirements);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var requirements = exports.requirements = [allRequirements.mysql];

var prompts = exports.prompts = [allPrompts.dbHost, allPrompts.dbRootUser, allPrompts.dbRootPassword, allPrompts.dbName, allPrompts.dbUser, allPrompts.dbPassword];

function run(answers) {
  var cmds = ['mysql --host=' + answers.dbHost + ' -u' + answers.dbRootUser + ' -p' + answers.dbRootPassword + ' -e       "CREATE DATABASE IF NOT EXISTS ' + answers.dbName + ';       CREATE USER \'' + answers.dbUser + '\'@\'' + answers.dbHost + '\' IDENTIFIED BY \'' + answers.dbPassword + '\';       GRANT ALL PRIVILEGES ON ' + answers.dbName + ' . * TO \'' + answers.dbUser + '\'@\'' + answers.dbHost + '\';       FLUSH PRIVILEGES;"'];
  return new _bluebird2.default(function (resolve, reject) {
    var exec = _child_process2.default.exec(cmds.join(' && '), function () {
      resolve();
    });
    exec.stdout.pipe(process.stdout);
    exec.stderr.pipe(process.stderr);
  });
}