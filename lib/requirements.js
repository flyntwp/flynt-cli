'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.composer = composer;
exports.wpCli = wpCli;
exports.git = git;
exports.yarn = yarn;
exports.mysql = mysql;

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _hasbin = require('hasbin');

var _hasbin2 = _interopRequireDefault(_hasbin);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function composer() {
  return new _bluebird2.default(function (resolve, reject) {
    (0, _hasbin2.default)('composer', function (exists) {
      if (exists) {
        resolve();
      } else {
        reject("Please have 'composer' available in your PATH.");
      }
    });
  });
}

function wpCli() {
  return new _bluebird2.default(function (resolve, reject) {
    (0, _hasbin2.default)('wp', function (exists) {
      if (exists) {
        resolve();
      } else {
        reject("Please have 'wp' available in your PATH.");
      }
    });
  });
}

function git() {
  return new _bluebird2.default(function (resolve, reject) {
    (0, _hasbin2.default)('git', function (exists) {
      if (exists) {
        resolve();
      } else {
        reject("Please have 'git' available in your PATH.");
      }
    });
  });
}

function yarn() {
  return new _bluebird2.default(function (resolve, reject) {
    (0, _hasbin2.default)('yarn', function (exists) {
      if (exists) {
        resolve();
      } else {
        reject("Please have 'yarn' available in your PATH.");
      }
    });
  });
}

function mysql() {
  return new _bluebird2.default(function (resolve, reject) {
    (0, _hasbin2.default)('mysql', function (exists) {
      if (exists) {
        resolve();
      } else {
        reject("Please have 'mysql' available in your PATH.");
      }
    });
  });
}