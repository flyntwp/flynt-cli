'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.prompts = exports.requirements = exports.runMessage = exports.description = undefined;
exports.run = run;

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _executeCommand = require('../utils/executeCommand');

var _executeCommand2 = _interopRequireDefault(_executeCommand);

var _Errors = require('../utils/Errors');

var _prompts = require('../prompts');

var allPrompts = _interopRequireWildcard(_prompts);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const description = exports.description = 'upgrade theme dependencies with bower';

const runMessage = exports.runMessage = 'Upgrading bower dependencies...';

const requirements = exports.requirements = [];

const prompts = exports.prompts = [allPrompts.themeName];

function run(answers) {
  const themePath = `web/app/themes/${answers.themeName}`;
  if (_fs2.default.existsSync(_path2.default.join(process.cwd(), themePath, 'bower.json'))) {
    const cmds = [`cd ${themePath}`, 'bower update'];
    return (0, _executeCommand2.default)(cmds);
  } else {
    return _bluebird2.default.reject(new _Errors.SubcommandSkip('bower', `Skipping bower update. No bower.json found in ${themePath}`));
  }
}