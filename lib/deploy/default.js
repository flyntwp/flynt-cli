'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.prompts = exports.requirements = exports.description = undefined;
exports.run = run;

var _executeCommand = require('../utils/executeCommand');

var _executeCommand2 = _interopRequireDefault(_executeCommand);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _prompts = require('../prompts');

var allPrompts = _interopRequireWildcard(_prompts);

var _requirements = require('../requirements');

var allRequirements = _interopRequireWildcard(_requirements);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var description = exports.description = 'deploy source code from local to any environment';

var requirements = exports.requirements = [allRequirements.rsync];

var prompts = exports.prompts = [allPrompts.sshHost, allPrompts.sshUser, allPrompts.sshPort, allPrompts.basePath, allPrompts.deployPath, allPrompts.sshHostRemote, allPrompts.sshUserRemote, allPrompts.sshPortRemote, allPrompts.basePathRemote, allPrompts.deployPathRemote, allPrompts.deployExcludes, allPrompts.rsyncFlags];

function run(answers, argv) {
  var rsyncFlags = answers.rsyncFlags || '';
  if (argv.dryRun) rsyncFlags += ' --dry-run';
  var sourceRemote = void 0,
      sourceSshId = void 0,
      destinationRemote = void 0,
      destinationSshId = void 0;
  if (answers.sshHost) {
    sourceRemote = true;
    sourceSshId = answers.sshHost;
    if (answers.sshUser) sourceSshId = answers.sshUser + '@' + sourceSshId;
  }
  if (answers.sshHostRemote) {
    destinationRemote = true;
    destinationSshId = answers.sshHostRemote;
    if (answers.sshUserRemote) destinationSshId = answers.sshUserRemote + '@' + destinationSshId;
  }
  var cmds = [];

  var source = _path2.default.normalize(answers.basePath + '/' + answers.deployPath).replace(/\/$/, '');
  if (sourceRemote) {
    source = sourceSshId + ':' + source;
  }
  var destination = _path2.default.normalize(answers.basePathRemote + '/' + answers.deployPathRemote + '/');
  if (destinationRemote) {
    destination = destinationSshId + ':' + destination;
  }

  var excludes = answers.deployExcludes.map(function (exclude) {
    return '--exclude=' + exclude;
  }).join(' ');
  if (destinationRemote && sourceRemote) {
    var tmpDir = './tmp/flynt-cli/deploy';
    cmds.push('mkdir -p ' + tmpDir);
    var sshCmdSource = answers.sshPort ? '-e "ssh -p ' + answers.sshPort + '"' : '';
    var sshCmdDestination = answers.sshPortRemote ? '-e "ssh -p ' + answers.sshPortRemote + '"' : '';
    cmds.push('rsync ' + rsyncFlags + ' ' + excludes + ' ' + sshCmdSource + ' ' + source + ' ' + tmpDir);
    cmds.push('rsync ' + rsyncFlags + ' ' + excludes + ' ' + sshCmdDestination + ' ' + tmpDir + ' ' + destination);
    cmds.push('rm -rf ' + tmpDir);
  } else {
    var sshCmd = sourceRemote ? answers.sshPort ? '-e "ssh -p ' + answers.sshPort + '"' : '' : answers.sshPortRemote ? '-e "ssh -p ' + answers.sshPortRemote + '"' : '';
    cmds.push('rsync ' + rsyncFlags + ' ' + excludes + ' ' + sshCmd + ' ' + source + ' ' + destination);
  }
  return (0, _executeCommand2.default)(cmds);
}