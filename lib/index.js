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

var _index2 = require('./clone/index');

var cloneCmd = _interopRequireWildcard(_index2);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import {builder} from './cmds/setup'

var configMapping = {
  projectName: 'projectName',
  basePath: 'basePath',
  uploadsPath: 'uploadsPath',
  dbHost: 'db.host',
  dbRootUser: 'db.root.user',
  dbRootPassword: 'db.root.password',
  dbName: 'db.name',
  dbUser: 'db.user',
  dbPassword: 'db.password',
  sshHost: 'ssh.host',
  sshUser: 'ssh.user',
  sshPort: 'ssh.port',
  wpEnv: 'wp.env',
  wpHome: 'wp.home',
  wpSiteurl: 'wp.siteurl',
  wpTitle: 'wp.title',
  wpAdminName: 'wp.admin.name',
  wpAdminEmail: 'wp.admin.email',
  gitRepo: 'repository'
};

var configGlobals = ['projectName', 'repository'];

_yargs2.default.command('setup', 'Setup a new flynt project', function (yargs) {
  setupCmd.cmds.forEach(function (cmd) {
    yargs = yargs.command(cmd, '', {}, handleSetupCmd('cmd'));
  });
  return yargs;
}, handleSetupCmd('setup')).command('clone', 'Clone database and medie files between environments', function (yargs) {
  cloneCmd.cmds.forEach(function (cmd) {
    yargs = yargs.command(cmd, '', {}, handleCloneCmd('cmd'));
  });
  return yargs.option('f', {
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
}, handleCloneCmd('clone')).option('c', {
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

function handleSetupCmd(location) {
  return function (argv) {
    if (location === 'setup' && argv._.length === 1) {
      var config = getConfig(argv);
      var run = setupCmd.run(null, mapConfigToAnswers(config, argv.env));
      return run.then(saveConfig(argv, config, argv.env));
    } else if (location === 'cmd' && argv._.length === 2) {
      var _config = getConfig(argv);
      var _run = setupCmd.run(argv._[1], mapConfigToAnswers(_config, argv.env));
      return _run.then(saveConfig(argv, _config, argv.env));
    }
  };
}

function handleCloneCmd(location) {
  return function (argv) {
    if (location === 'clone' && argv._.length === 1) {
      var config = getConfig(argv);
      var run = cloneCmd.run(null, mapConfigToAnswers(config, argv.from, argv.to));
      return run.then(saveConfig(argv, config, argv.from, argv.to));
    } else if (location === 'cmd' && argv._.length === 2) {
      var _config2 = getConfig(argv);
      var _run2 = cloneCmd.run(argv._[1], mapConfigToAnswers(_config2, argv.from, argv.to));
      return _run2.then(saveConfig(argv, _config2, argv.from, argv.to));
    }
  };
}

function getConfig(argv) {
  var config = {};
  if (argv.c) {
    try {
      config = require(_path2.default.join(process.cwd(), argv.configPath));
    } catch (e) {}
  }
  return config;
}

function saveConfig(argv, config, env) {
  var envRemote = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;

  return function (answers) {
    if (argv.s) {
      config = _lodash2.default.merge({}, config, mapAnswersToConfig(answers, env, envRemote));
      var json = JSON.stringify(config, null, 2);
      _fs2.default.writeFileSync(argv.configPath, json, 'utf-8');
    }
  };
}

function mapConfigToAnswers(config, env, envRemote) {
  var answers = {};
  _lodash2.default.forEach(configMapping, function (value, key) {
    var configKey = _lodash2.default.includes(configGlobals, value) ? value : 'environments.' + env + '.' + value;
    if (_lodash2.default.has(config, configKey)) {
      _lodash2.default.set(answers, key, _lodash2.default.get(config, configKey));
    }
    if (envRemote && !_lodash2.default.includes(configGlobals, value)) {
      var configKeyRemote = 'environments.' + envRemote + '.' + value;
      if (_lodash2.default.has(config, configKeyRemote)) {
        _lodash2.default.set(answers, key + 'Remote', _lodash2.default.get(config, configKeyRemote));
      }
    }
  });
  return answers;
}

function mapAnswersToConfig(answers, env, envRemote) {
  var config = {};
  _lodash2.default.forEach(answers, function (value, key) {
    var configKey = configMapping[key] || key;
    if (_lodash2.default.includes(configGlobals, configKey)) {
      _lodash2.default.set(config, configKey, value);
    } else {
      if (key.substr(key.length - 'Remote'.length) === 'Remote') {
        key = key.substr(0, key.length - 'Remote'.length);
        var configKeyRemote = configMapping[key] || key;
        _lodash2.default.set(config, 'environments.' + envRemote + '.' + configKeyRemote, value);
      } else {
        _lodash2.default.set(config, 'environments.' + env + '.' + configKey, value);
      }
    }
  });
  return config;
}