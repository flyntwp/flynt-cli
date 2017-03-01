'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.description = exports.cmds = exports.commands = undefined;

var _composer = require('./composer');

var composer = _interopRequireWildcard(_composer);

var _yarn = require('./yarn');

var yarn = _interopRequireWildcard(_yarn);

var _bower = require('./bower');

var bower = _interopRequireWildcard(_bower);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var commands = exports.commands = {
  composer: composer,
  yarn: yarn,
  bower: bower
};

var cmds = exports.cmds = Object.keys(commands);

var description = exports.description = 'upgrade flynt dependencies (composer, yarn, bower)';