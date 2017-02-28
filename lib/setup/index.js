'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.cmds = exports.commands = undefined;

var _composer = require('../install/composer');

var installComposer = _interopRequireWildcard(_composer);

var _yarn = require('../install/yarn');

var installYarn = _interopRequireWildcard(_yarn);

var _db = require('../create/db');

var createDb = _interopRequireWildcard(_db);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var commands = exports.commands = {
  installComposer: installComposer,
  installYarn: installYarn,
  createDb: createDb
};

var cmds = exports.cmds = Object.keys(commands);