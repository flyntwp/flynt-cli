'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (cmds) {
  return new _bluebird2.default(function (resolve, reject) {
    var exec = _child_process2.default.exec(cmds.join(' && '), function () {
      resolve();
    });
    exec.stdout.pipe(process.stdout);
    exec.stderr.pipe(process.stderr);
  });
};

var _child_process = require('child_process');

var _child_process2 = _interopRequireDefault(_child_process);

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }