'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.destEnv = exports.srcEnv = exports.options = exports.description = exports.name = exports.cmds = exports.commands = undefined;

var _db = require('./db');

var db = _interopRequireWildcard(_db);

var _uploads = require('./uploads');

var uploads = _interopRequireWildcard(_uploads);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

const commands = exports.commands = {
  db,
  uploads
};

const cmds = exports.cmds = Object.keys(commands);

const name = exports.name = 'clone';

const description = exports.description = 'clone database and media files between environments';

const options = exports.options = {
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

const srcEnv = exports.srcEnv = 'argv.from';

const destEnv = exports.destEnv = 'argv.to';