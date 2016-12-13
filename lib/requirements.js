'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.composer = composer;
exports.wpCli = wpCli;
exports.git = git;
exports.yarn = yarn;
exports.mysql = mysql;
exports.mysqldump = mysqldump;
exports.php = php;
exports.ssh = ssh;
exports.scp = scp;
exports.sed = sed;
exports.rsync = rsync;

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _hasbin = require('hasbin');

var _hasbin2 = _interopRequireDefault(_hasbin);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function checkForBinary(cmd) {
  return new _bluebird2.default(function (resolve, reject) {
    (0, _hasbin2.default)(cmd, function (exists) {
      if (exists) {
        resolve();
      } else {
        reject('Please have \'' + cmd + '\' available in your PATH.');
      }
    });
  });
}

function composer() {
  return checkForBinary('composer');
}

function wpCli() {
  return checkForBinary('wp');
}

function git() {
  return checkForBinary('git');
}

function yarn() {
  return checkForBinary('yarn');
}

function mysql() {
  return checkForBinary('mysql');
}

function mysqldump() {
  return checkForBinary('mysqldump');
}

function php() {
  return checkForBinary('php');
}

function ssh() {
  return checkForBinary('ssh');
}

function scp() {
  return checkForBinary('scp');
}

function sed() {
  return checkForBinary('sed');
}

function rsync() {
  return checkForBinary('rsync');
}