'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.description = exports.cmds = exports.commands = undefined;

var _default = require('./default');

var deployDefault = _interopRequireWildcard(_default);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var commands = exports.commands = {
  default: deployDefault
};

var cmds = exports.cmds = Object.keys(commands);

var description = exports.description = 'deploy source code from local to any environment';