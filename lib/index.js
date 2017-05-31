#!/usr/bin/env node
'use strict';

var _yargs = require('yargs');

var _yargs2 = _interopRequireDefault(_yargs);

var _handleCommand = require('./utils/handleCommand');

var _handleCommand2 = _interopRequireDefault(_handleCommand);

var _buildArguments = require('./utils/buildArguments');

var _buildArguments2 = _interopRequireDefault(_buildArguments);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const commands = ['create', 'setup', 'install', 'upgrade', 'start', 'build', 'clone', 'deploy'];

let cli = _yargs2.default.usage('Usage: $0 <command> [<subcommand>] [options]');

commands.forEach(function (command) {
  const cmdObject = require(`./${command}`);
  cli = cli.command(command, cmdObject.description, (0, _buildArguments2.default)(cmdObject, cmdObject.srcEnv || 'argv.env', cmdObject.destEnv, cmdObject.options), (0, _handleCommand2.default)(cmdObject, cmdObject.srcEnv || 'argv.env', cmdObject.destEnv));
});
cli.option('skipReadConfig', {
  global: true,
  describe: 'Do not read config from file',
  type: 'boolean'
}).option('skipWriteConfig', {
  global: true,
  describe: 'Do not write config to file',
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
}).option('v', {
  alias: 'verbose',
  global: true,
  describe: 'Use verbose mode',
  type: 'boolean'
}).locale('en').help().wrap().argv;