'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.destEnv = exports.srcEnv = exports.options = exports.description = exports.cmds = exports.commands = undefined;

var _default = require('./default');

var deployDefault = _interopRequireWildcard(_default);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var commands = exports.commands = {
  default: deployDefault
};

var cmds = exports.cmds = Object.keys(commands);

var description = exports.description = 'deploy source code from local to any environment';

var options = exports.options = {
  to: {
    describe: 'Environment to clone to',
    type: 'string',
    default: 'development'
  },
  n: {
    alias: 'dry-run',
    describe: 'Perform trial run',
    type: 'boolean'
  }
};

var srcEnv = exports.srcEnv = 'local';

var destEnv = exports.destEnv = 'argv.to';