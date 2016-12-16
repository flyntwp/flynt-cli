#!/usr/bin/env node
'use strict';

var _yargs = require('yargs');

var _yargs2 = _interopRequireDefault(_yargs);

var _handleCommand = require('./utils/handleCommand');

var _handleCommand2 = _interopRequireDefault(_handleCommand);

var _buildArguments = require('./utils/buildArguments');

var _buildArguments2 = _interopRequireDefault(_buildArguments);

var _index = require('./setup/index');

var setupCmd = _interopRequireWildcard(_index);

var _index2 = require('./clone/index');

var cloneCmd = _interopRequireWildcard(_index2);

var _index3 = require('./deploy/index');

var deployCmd = _interopRequireWildcard(_index3);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import {builder} from './cmds/setup'

_yargs2.default.command('setup', 'Setup a new flynt project', (0, _buildArguments2.default)(setupCmd, 'argv.env'), (0, _handleCommand2.default)(setupCmd, 'argv.env')).command('clone', 'Clone database and medie files between environments', function (yargs) {
  (0, _buildArguments2.default)(cloneCmd, 'argv.from', 'argv.to')(yargs).option('f', {
    alias: 'from',
    // global: true,
    describe: 'Environment to clone from',
    type: 'string',
    default: 'development'
  }).option('t', {
    alias: 'to',
    // global: true,
    describe: 'Environment to clone to',
    type: 'string',
    default: 'local'
  });
}, (0, _handleCommand2.default)(cloneCmd, 'argv.from', 'argv.to')).command('deploy', 'Deploy source code from local to any environment', function (yargs) {
  (0, _buildArguments2.default)(cloneCmd, 'local', 'argv.to')(yargs).option('t', {
    alias: 'to',
    // global: true,
    describe: 'Environment to clone to',
    type: 'string',
    default: 'development'
  });
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
}).help().argv;