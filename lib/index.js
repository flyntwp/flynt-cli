#!/usr/bin/env node
'use strict';

var _yargs = require('yargs');

var _yargs2 = _interopRequireDefault(_yargs);

var _handleCommand = require('./utils/handleCommand');

var _handleCommand2 = _interopRequireDefault(_handleCommand);

var _buildArguments = require('./utils/buildArguments');

var _buildArguments2 = _interopRequireDefault(_buildArguments);

var _create = require('./create');

var createCmd = _interopRequireWildcard(_create);

var _setup = require('./setup');

var setupCmd = _interopRequireWildcard(_setup);

var _install = require('./install');

var installCmd = _interopRequireWildcard(_install);

var _upgrade = require('./upgrade');

var upgradeCmd = _interopRequireWildcard(_upgrade);

var _watch = require('./watch');

var watchCmd = _interopRequireWildcard(_watch);

var _build = require('./build');

var buildCmd = _interopRequireWildcard(_build);

var _clone = require('./clone');

var cloneCmd = _interopRequireWildcard(_clone);

var _deploy = require('./deploy');

var deployCmd = _interopRequireWildcard(_deploy);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_yargs2.default.command('create', 'Create a new flynt project', (0, _buildArguments2.default)(createCmd, 'argv.env'), (0, _handleCommand2.default)(createCmd, 'argv.env', null, null, true)).command('setup', 'Setup an existing flynt project', (0, _buildArguments2.default)(setupCmd, 'argv.env'), (0, _handleCommand2.default)(setupCmd, 'argv.env')).command('install', 'Install flynt dependencies (yarn, composer)', (0, _buildArguments2.default)(installCmd, 'argv.env'), (0, _handleCommand2.default)(installCmd, 'argv.env')).command('upgrade', 'Upgrade flynt dependencies (yarn, composer)', (0, _buildArguments2.default)(upgradeCmd, 'argv.env'), (0, _handleCommand2.default)(upgradeCmd, 'argv.env')).command('watch', 'Run yarn watch for flynt theme', (0, _buildArguments2.default)(watchCmd, 'argv.env'), (0, _handleCommand2.default)(watchCmd, 'argv.env')).command('build', 'Run yarn build for flynt theme', (0, _buildArguments2.default)(buildCmd, 'argv.env'), (0, _handleCommand2.default)(buildCmd, 'argv.env')).command('clone', 'Clone database and medie files between environments', function (yargs) {
  (0, _buildArguments2.default)(cloneCmd, 'argv.from', 'argv.to', {
    from: {
      describe: 'Environment to clone from',
      type: 'string',
      default: 'development'
    },
    to: {
      describe: 'Environment to clone to',
      type: 'string',
      default: 'local'
    }
  })(yargs);
}, (0, _handleCommand2.default)(cloneCmd, 'argv.from', 'argv.to')).command('deploy', 'Deploy source code from local to any environment', function (yargs) {
  (0, _buildArguments2.default)(cloneCmd, 'local', 'argv.to', {
    to: {
      describe: 'Environment to clone to',
      type: 'string',
      default: 'development'
    }
  })(yargs);
}, (0, _handleCommand2.default)(deployCmd, 'local', 'argv.to')).option('c', {
  alias: 'config',
  global: true,
  describe: 'Read config from file?',
  type: 'boolean'
}).option('s', {
  alias: 'saveConfig',
  global: true,
  describe: 'Write config to file?',
  type: 'boolean'
}).option('configPath', {
  global: true,
  default: './.flynt.json',
  describe: 'File to read from and save config to.',
  type: 'string'
}).option('e', {
  alias: ['env', 'environment'],
  global: true,
  default: 'local',
  describe: 'Specify current environment',
  type: 'string'
}).option('f', {
  alias: 'force',
  global: true,
  describe: 'Force execution in current directory',
  type: 'boolean'
}).help().argv;