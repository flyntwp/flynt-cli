'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.cmds = exports.commands = undefined;

var _composerInstall = require('./composerInstall');

var composerInstall = _interopRequireWildcard(_composerInstall);

var _yarnInstall = require('./yarnInstall');

var yarnInstall = _interopRequireWildcard(_yarnInstall);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var commands = exports.commands = {
  composerInstall: composerInstall,
  yarnInstall: yarnInstall
};

var cmds = exports.cmds = Object.keys(commands);