'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.cmds = exports.commands = undefined;

var _cloneDb = require('./cloneDb');

var cloneDb = _interopRequireWildcard(_cloneDb);

var _cloneUploads = require('./cloneUploads');

var cloneUploads = _interopRequireWildcard(_cloneUploads);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var commands = exports.commands = {
  cloneDb: cloneDb,
  cloneUploads: cloneUploads
};

var cmds = exports.cmds = Object.keys(commands);