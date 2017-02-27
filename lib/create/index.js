'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.cmds = exports.commands = undefined;

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

var _createDb = require('./createDb');

var createDb = _interopRequireWildcard(_createDb);

var _setupWordpress = require('./setupWordpress');

var setupWordpress = _interopRequireWildcard(_setupWordpress);

var _yarnBuild = require('../build/yarnBuild');

var yarnBuild = _interopRequireWildcard(_yarnBuild);

var _activateWordpress = require('./activateWordpress');

var activateWordpress = _interopRequireWildcard(_activateWordpress);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var commands = exports.commands = {
  installBedrock: installBedrock,
  adjustGitignore: adjustGitignore,
  requireComposerPackages: requireComposerPackages,
  setupTheme: setupTheme,
  replaceProjectSpecificStrings: replaceProjectSpecificStrings,
  createDb: createDb,
  setupWordpress: setupWordpress,
  yarnBuild: yarnBuild,
  activateWordpress: activateWordpress,
  initGitRepo: initGitRepo
};

var cmds = exports.cmds = Object.keys(commands);