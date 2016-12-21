'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (cmds) {
  return new _bluebird2.default(function (resolve, reject) {
    var spawn = void 0;

    var isWin = process.platform === 'win32';
    if (isWin) {
      spawn = _child_process2.default.spawn('cmd.exe', ['/s', '/c', '"' + cmds.join(' && ') + '"'], { windowsVerbatimArguments: true, stdio: [process.stdin, 'pipe', 'pipe'] });
    } else {
      spawn = _child_process2.default.spawn('/bin/sh', ['-c', cmds.join(' && ')]);
    }

    spawn.stdout.pipe(process.stdout);
    spawn.stderr.pipe(process.stderr);
    spawn.on('exit', function () {
      resolve();
    });
  });
};

var _child_process = require('child_process');

var _child_process2 = _interopRequireDefault(_child_process);

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }