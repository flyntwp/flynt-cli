'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.cmds = exports.commands = undefined;

var _deployDefault = require('./deployDefault');

var deployDefault = _interopRequireWildcard(_deployDefault);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var commands = exports.commands = {
  deployDefault: deployDefault
};

var cmds = exports.cmds = Object.keys(commands);