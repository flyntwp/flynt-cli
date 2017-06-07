'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.description = exports.name = exports.cmds = exports.commands = undefined;

var _installBedrock = require('./installBedrock');

var installBedrock = _interopRequireWildcard(_installBedrock);

var _adjustGitignore = require('./adjustGitignore');

var adjustGitignore = _interopRequireWildcard(_adjustGitignore);

var _requireComposerPackages = require('./requireComposerPackages');

var requireComposerPackages = _interopRequireWildcard(_requireComposerPackages);

var _setupTheme = require('./setupTheme');

var setupTheme = _interopRequireWildcard(_setupTheme);

var _replaceProjectSpecificStrings = require('./replaceProjectSpecificStrings');

var replaceProjectSpecificStrings = _interopRequireWildcard(_replaceProjectSpecificStrings);

var _initGitRepo = require('./initGitRepo');

var initGitRepo = _interopRequireWildcard(_initGitRepo);

var _db = require('./db');

var db = _interopRequireWildcard(_db);

var _setupWordpress = require('./setupWordpress');

var setupWordpress = _interopRequireWildcard(_setupWordpress);

var _yarn = require('../install/yarn');

var installYarn = _interopRequireWildcard(_yarn);

var _bower = require('../install/bower');

var installBower = _interopRequireWildcard(_bower);

var _yarn2 = require('../build/yarn');

var buildYarn = _interopRequireWildcard(_yarn2);

var _activateWordpress = require('./activateWordpress');

var activateWordpress = _interopRequireWildcard(_activateWordpress);

var _removeDotEnv = require('./removeDotEnv');

var removeDotEnv = _interopRequireWildcard(_removeDotEnv);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

const commands = exports.commands = {
  installBedrock,
  adjustGitignore,
  requireComposerPackages,
  setupTheme,
  replaceProjectSpecificStrings,
  db,
  installYarn,
  installBower,
  buildYarn,
  removeDotEnv,
  setupWordpress,
  activateWordpress,
  initGitRepo
};

const cmds = exports.cmds = Object.keys(commands);

const name = exports.name = 'create';

const description = exports.description = 'create a new flynt project';