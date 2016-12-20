'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.prompts = exports.requirements = undefined;
exports.run = run;

var _exec = require('../utils/exec');

var _exec2 = _interopRequireDefault(_exec);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _prompts = require('../prompts');

var allPrompts = _interopRequireWildcard(_prompts);

var _requirements = require('../requirements');

var allRequirements = _interopRequireWildcard(_requirements);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var requirements = exports.requirements = [allRequirements.mysql, allRequirements.mysqldump, allRequirements.php, allRequirements.ssh, allRequirements.scp, allRequirements.sed];

var prompts = exports.prompts = [allPrompts.basePath, allPrompts.wpReplace, allPrompts.dbHost, allPrompts.dbUser, allPrompts.dbName, allPrompts.dbPassword, allPrompts.sshHost, allPrompts.sshUser, allPrompts.sshPort, allPrompts.basePathRemote, allPrompts.wpReplaceRemote, allPrompts.dbHostRemote, allPrompts.dbUserRemote, allPrompts.dbNameRemote, allPrompts.dbPasswordRemote, allPrompts.sshHostRemote, allPrompts.sshUserRemote, allPrompts.sshPortRemote];

function run(answers) {
  answers.wpReplace = [].concat(answers.wpReplace);
  answers.wpReplaceRemote = [].concat(answers.wpReplaceRemote);
  if (answers.wpReplace.length !== answers.wpReplaceRemote.length) {
    console.log('Search and Replace terms must have the same number of arguments.');
    return;
  }
  var tmpDir = './tmp/flynt-cli';
  var backupDir = './backup';
  var backupTransferFile = 'tmp_backup.sql';
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
  var cmds = ['mkdir -p ' + tmpDir, 'mkdir -p ' + backupDir];

  var destinationBackupCmd = 'mysqldump --host=' + answers.dbHostRemote + ' -u' + answers.dbUserRemote + ' -p' + answers.dbPasswordRemote + ' ' + answers.dbNameRemote + ' > ' + answers.basePathRemote + '/' + backupDir + '/backup_' + Date.now() + '.sql';
  if (destinationRemote) {
    cmds.push('ssh ' + (answers.sshPortRemote ? '-p ' + answers.sshPortRemote : '') + ' -t ' + destinationSshId + ' \'mkdir -p ' + answers.basePathRemote + '/' + backupDir + ' && mkdir -p ' + answers.basePathRemote + '/' + tmpDir + ' && ' + destinationBackupCmd + '\'');
  } else {
    cmds.push(destinationBackupCmd);
  }

  var sourceDumpCmd = 'mysqldump --host=' + answers.dbHost + ' -u' + answers.dbUser + ' -p' + answers.dbPassword + ' ' + answers.dbName + ' > ' + answers.basePath + '/' + tmpDir + '/' + backupTransferFile;
  if (sourceRemote) {
    cmds.push('ssh ' + (answers.sshPort ? '-p ' + answers.sshPort : '') + ' -t ' + sourceSshId + ' \'mkdir -p ' + answers.basePath + '/' + tmpDir + ' && ' + sourceDumpCmd + '\'');
  } else {
    cmds.push(sourceDumpCmd);
  }
  if (sourceRemote) {
    cmds.push('scp ' + (answers.sshPort ? '-P ' + answers.sshPort : '') + ' ' + sourceSshId + ':' + answers.basePath + '/' + tmpDir + '/' + backupTransferFile + ' ' + tmpDir);
  }
  cmds.push('sed -i \'\' \'s/DEFINER=[^*]*\\*/\\*/g\' ' + tmpDir + '/' + backupTransferFile);
  if (destinationRemote) {
    cmds.push('scp ' + (answers.sshPortRemote ? '-P ' + answers.sshPortRemote : '') + ' ' + tmpDir + '/' + backupTransferFile + ' ' + destinationSshId + ':' + answers.basePathRemote + '/' + tmpDir);
    cmds.push('rm ' + tmpDir + '/' + backupTransferFile);
  }
  if (sourceRemote) {
    cmds.push('ssh ' + (answers.sshPort ? '-p ' + answers.sshPort : '') + ' -t ' + sourceSshId + ' \'rm ' + answers.basePath + '/' + tmpDir + '/' + backupTransferFile + '\'');
  }

  var destinationImportCmd = 'mysql --host=' + answers.dbHostRemote + ' -u' + answers.dbNameRemote + ' -p' + answers.dbPasswordRemote + ' ' + answers.dbNameRemote + ' < ' + answers.basePathRemote + '/' + tmpDir + '/' + backupTransferFile + ' && rm ' + answers.basePathRemote + '/' + tmpDir + '/' + backupTransferFile;
  if (destinationRemote) {
    cmds.push('ssh ' + (answers.sshPortRemote ? '-p ' + answers.sshPortRemote : '') + ' -t ' + destinationSshId + ' \'' + destinationImportCmd + '\'');
  } else {
    cmds.push(destinationImportCmd);
  }

  var srdbPath = require.resolve('search-replace-db');
  if (destinationRemote) {
    cmds.push('scp -r ' + (answers.sshPortRemote ? '-P ' + answers.sshPortRemote : '') + ' ' + _path2.default.join(srdbPath, '..') + ' ' + destinationSshId + ':' + answers.basePathRemote + '/' + tmpDir);
    answers.wpReplace.forEach(function (searchString, i) {
      var replaceString = answers.wpReplaceRemote[i];
      var destinationReplaceCmd = 'php ' + _path2.default.join(answers.basePathRemote, tmpDir, 'search-replace-db', _path2.default.basename(srdbPath)) + ' -h ' + answers.dbHostRemote + ' -u ' + answers.dbUserRemote + ' -p ' + answers.dbPasswordRemote + ' -n ' + answers.dbNameRemote + ' -s \'' + searchString + '\' -r \'' + replaceString + '\'';
      cmds.push('ssh ' + (answers.sshPortRemote ? '-p ' + answers.sshPortRemote : '') + ' -t ' + destinationSshId + ' \'' + destinationReplaceCmd + '\'');
    });
  } else {
    answers.wpReplace.forEach(function (searchString, i) {
      var replaceString = answers.wpReplaceRemote[i];
      cmds.push('php ' + srdbPath + ' -h ' + answers.dbHostRemote + ' -u ' + answers.dbUserRemote + ' -p ' + answers.dbPasswordRemote + ' -n ' + answers.dbNameRemote + ' -s \'' + searchString + '\' -r \'' + replaceString + '\'');
    });
  }

  return (0, _exec2.default)(cmds);
}