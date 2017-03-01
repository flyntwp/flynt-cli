'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.options = exports.description = exports.cmds = exports.commands = undefined;

var _db = require('./db');

var db = _interopRequireWildcard(_db);

var _uploads = require('./uploads');

var uploads = _interopRequireWildcard(_uploads);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var commands = exports.commands = {
  db: db,
  uploads: uploads
};

var cmds = exports.cmds = Object.keys(commands);

var description = exports.description = 'clone database and media files between environments';

var options = exports.options = {
  from: {
    describe: 'Environment to clone from',
    type: 'string',
    default: 'development'
  },
  to: {
    describe: 'Environment to clone to',
    type: 'string',
    default: 'local'
  }
};