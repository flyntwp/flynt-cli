'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.prompts = exports.requirements = exports.description = undefined;
exports.run = run;

var _executeCommand = require('../utils/executeCommand');

var _executeCommand2 = _interopRequireDefault(_executeCommand);

var _prompts = require('../prompts');

var allPrompts = _interopRequireWildcard(_prompts);

var _requirements = require('../requirements');

var allRequirements = _interopRequireWildcard(_requirements);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const description = exports.description = 'clone media files between environments';

const requirements = exports.requirements = [allRequirements.rsync];

const prompts = exports.prompts = [allPrompts.basePath, allPrompts.uploadsPath, allPrompts.dbHost, allPrompts.dbUser, allPrompts.dbName, allPrompts.dbPassword, allPrompts.sshHost, allPrompts.sshUser, allPrompts.sshPort, allPrompts.basePathRemote, allPrompts.uploadsPathRemote, allPrompts.dbHostRemote, allPrompts.dbUserRemote, allPrompts.dbNameRemote, allPrompts.dbPasswordRemote, allPrompts.sshHostRemote, allPrompts.sshUserRemote, allPrompts.sshPortRemote];

function run(answers) {
  let sourceRemote, sourceSshId, destinationRemote, destinationSshId;
  if (answers.sshHost) {
    sourceRemote = true;
    sourceSshId = answers.sshHost;
    if (answers.sshUser) sourceSshId = `${ answers.sshUser }@${ sourceSshId }`;
  }
  if (answers.sshHostRemote) {
    destinationRemote = true;
    destinationSshId = answers.sshHostRemote;
    if (answers.sshUserRemote) destinationSshId = `${ answers.sshUserRemote }@${ destinationSshId }`;
  }
  let cmds = [];

  let source = `${ answers.basePath }/${ answers.uploadsPath }/`;
  if (sourceRemote) {
    source = `${ sourceSshId }:${ source }`;
  }
  let destination = `${ answers.basePathRemote }/${ answers.uploadsPathRemote }/`;
  if (destinationRemote) {
    destination = `${ destinationSshId }:${ destination }`;
  }

  if (destinationRemote && sourceRemote) {
    const tmpDir = './tmp/flynt-cli/uploads';
    cmds.push(`mkdir -p ${ tmpDir }`);
    const sshCmdSource = answers.sshPort ? `-e "ssh -p ${ answers.sshPort }"` : '';
    const sshCmdDestination = answers.sshPortRemote ? `-e "ssh -p ${ answers.sshPortRemote }"` : '';
    cmds.push(`rsync -chavzP --stats ${ sshCmdSource } ${ source } ${ tmpDir }`);
    cmds.push(`rsync -chavzP --stats ${ sshCmdDestination } ${ tmpDir } ${ destination }`);
    cmds.push(`rm -rf ${ tmpDir }`);
  } else {
    const sshCmd = sourceRemote ? answers.sshPort ? `-e "ssh -p ${ answers.sshPort }"` : '' : answers.sshPortRemote ? `-e "ssh -p ${ answers.sshPortRemote }"` : '';
    cmds.push(`rsync -chavzP --stats ${ sshCmd } ${ source } ${ destination }`);
  }

  return (0, _executeCommand2.default)(cmds);
}