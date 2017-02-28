'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.cmds = exports.commands = undefined;

var _composerUpdate = require('./composerUpdate');

var composerUpdate = _interopRequireWildcard(_composerUpdate);

var _yarnUpgrade = require('./yarnUpgrade');

var yarnUpgrade = _interopRequireWildcard(_yarnUpgrade);

var _bowerUpdate = require('./bowerUpdate');

var bowerUpdate = _interopRequireWildcard(_bowerUpdate);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var commands = exports.commands = {
  composerUpdate: composerUpdate,
  yarnUpgrade: yarnUpgrade,
  bowerUpdate: bowerUpdate
};

var cmds = exports.cmds = Object.keys(commands);