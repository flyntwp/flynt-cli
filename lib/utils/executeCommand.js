'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (cmds) {
  return new _bluebird2.default(function (resolve, reject) {
    let spawn;
    let options = {};

    if (log.is('DEBUG')) {
      options['stdio'] = 'inherit';
      console.log('');
    } else {
      options['stdio'] = 'ignore';
    }

    options['stdio'] = log.is('DEBUG') ? 'inherit' : 'ignore';

    const isWin = process.platform === 'win32';
    if (isWin) {
      options['windowsVerbatimArguments'] = true;
      spawn = _child_process2.default.spawn('cmd.exe', ['/s', '/c', '"' + cmds.join(' && ') + '"'], options);
    } else {
      spawn = _child_process2.default.spawn('/bin/sh', ['-c', cmds.join(' && ')], options);
    }

    spawn.on('exit', function (code) {
      if (code === 0) {
        resolve();
      } else {
        reject(new _Errors.SubcommandError());
      }
    });
  });
};

var _child_process = require('child_process');

var _child_process2 = _interopRequireDefault(_child_process);

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _log = require('./log');

var log = _interopRequireWildcard(_log);

var _Errors = require('./Errors');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }