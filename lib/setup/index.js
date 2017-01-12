'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.cmds = exports.commands = undefined;

var _composerInstall = require('../install/composerInstall');

var composerInstall = _interopRequireWildcard(_composerInstall);

var _yarnInstall = require('../install/yarnInstall');

var yarnInstall = _interopRequireWildcard(_yarnInstall);

var _createDb = require('../create/createDb');

var createDb = _interopRequireWildcard(_createDb);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var commands = exports.commands = {
  composerInstall: composerInstall,
  yarnInstall: yarnInstall,
  createDb: createDb
};

var cmds = exports.cmds = Object.keys(commands);