#!/usr/bin/env node
'use strict';

var _yargs = require('yargs');

var _yargs2 = _interopRequireDefault(_yargs);

var _inquirer = require('inquirer');

var _inquirer2 = _interopRequireDefault(_inquirer);

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _index = require('./setup/index');

var setupCmd = _interopRequireWildcard(_index);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import {builder} from './cmds/setup'

_yargs2.default.command('setup', 'Setup a new flynt project', function (yargs) {
  setupCmd.cmds.forEach(function (cmd) {
    yargs = yargs.command(cmd, '', {}, function (argv) {
      console.log(cmd, argv);
    });
  });
  return yargs;
}, handleSetupCmd).help().argv;

function handleSetupCmd(argv) {
  if (argv._.length === 1) {
    setupCmd.run();
  } else if (argv._.length === 2) {
    setupCmd.run(argv._[1]);
  }
}