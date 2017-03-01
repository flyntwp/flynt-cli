'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.description = exports.name = exports.cmds = exports.commands = undefined;

var _yarn = require('./yarn');

var yarn = _interopRequireWildcard(_yarn);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var commands = exports.commands = {
  yarn: yarn
};

var cmds = exports.cmds = Object.keys(commands);

var name = exports.name = 'start';

var description = exports.description = 'run yarn start for flynt theme';