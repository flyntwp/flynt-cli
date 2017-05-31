'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (cmds, notify) {
  return new _bluebird2.default(function (resolve, reject) {
    let spawn;
    let options = {
      stdio: 'pipe',
      env: _lodash2.default.assign({}, process.env, {
        'FORCE_COLOR': true,
        'SHELL_PIPE': false
      })
    };

    if (log.is('DEBUG')) {
      console.log('');
    }

    const isWin = process.platform === 'win32';
    if (isWin) {
      options['windowsVerbatimArguments'] = true;
      spawn = _child_process2.default.spawn('cmd.exe', ['/s', '/c', '"' + cmds.join(' && ') + '"'], options);
    } else {
      spawn = _child_process2.default.spawn('/bin/sh', ['-c', cmds.join(' && ')], options);
    }

    spawn.on('exit', function (code) {
      if (log.is('DEBUG')) {
        log.default('');
      }
      if (code === 0) {
        resolve();
      } else {
        reject(new _Errors.SubcommandError());
      }
    });

    if (log.is('DEBUG')) {
      spawn.stdout.pipe(process.stdout);
      spawn.stdin.pipe(process.stdin);
      spawn.stderr.pipe(process.stderr);
    }

    if (_lodash2.default.isFunction(notify)) {
      notify(spawn.stdout, spawn.stderr);
    }
  });
};

var _child_process = require('child_process');

var _child_process2 = _interopRequireDefault(_child_process);

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _log = require('./log');

var log = _interopRequireWildcard(_log);

var _Errors = require('./Errors');

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }