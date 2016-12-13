#!/usr/bin/env node
'use strict';

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _yargs = require('yargs');

var _yargs2 = _interopRequireDefault(_yargs);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _index = require('./setup/index');

var setupCmd = _interopRequireWildcard(_index);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import {builder} from './cmds/setup'

_yargs2.default.command('setup', 'Setup a new flynt project', function (yargs) {
  setupCmd.cmds.forEach(function (cmd) {
    yargs = yargs.command(cmd, '', {}, handleSetupCmd('cmd'));
  });
  return yargs;
}, handleSetupCmd('setup')).option('c', {
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
}).help().argv;

function handleSetupCmd(location) {
  return function (argv) {
    console.log(location, argv.c, argv.s, argv.configPath);
    var config = {};
    if (argv.c) {
      try {
        config = require(_path2.default.join(process.cwd(), argv.configPath));
      } catch (e) {}
    }
    var run = void 0;
    if (location === 'setup' && argv._.length === 1) {
      run = setupCmd.run(null, config);
    } else if (location === 'cmd' && argv._.length === 2) {
      run = setupCmd.run(argv._[1], config);
    } else {
      return;
    }
    console.log(run);
    run.then(function (answers) {
      console.log('saving', argv.s, answers);
      if (argv.s) {
        _lodash2.default.merge(config, answers);
        var json = JSON.stringify(config, null, 2);
        _fs2.default.writeFileSync(argv.configPath, json, 'utf-8');
      }
    });
  };
}