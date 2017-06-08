'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.prompts = exports.requirements = exports.runMessage = exports.description = undefined;
exports.run = run;

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _through2Filter = require('through2-filter');

var _through2Filter2 = _interopRequireDefault(_through2Filter);

var _stripAnsi = require('strip-ansi');

var _stripAnsi2 = _interopRequireDefault(_stripAnsi);

var _executeCommand = require('../utils/executeCommand');

var _executeCommand2 = _interopRequireDefault(_executeCommand);

var _log = require('../utils/log');

var _prompts = require('../prompts');

var allPrompts = _interopRequireWildcard(_prompts);

var _requirements = require('../requirements');

var allRequirements = _interopRequireWildcard(_requirements);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const description = exports.description = 'run yarn start for flynt theme';

const runMessage = exports.runMessage = 'Starting development environment...';
const runMessageWatching = 'Watching files...';

const requirements = exports.requirements = [allRequirements.yarn, allRequirements.gulp];

const prompts = exports.prompts = [allPrompts.themeName];

function run(answers, arv, spinner) {
  const themePath = `web/app/themes/${answers.themeName}`;
  let cmds = [`cd ${themePath}`, 'yarn start'];
  if ((0, _log.is)('DEBUG')) {
    return (0, _executeCommand2.default)(cmds);
  } else {
    return (0, _executeCommand2.default)(cmds, notify(spinner));
  }
}

function notify(spinner) {
  return function (stdout, stderr) {
    const onBrowserSync = (0, _through2Filter2.default)({ wantStrings: true }, function (chunk) {
      const ignoredLines = ["Finished '", "Starting '", '$ check-node-version', 'node:', 'npm:', 'yarn:', 'yarn start', 'Using gulpfile', '[webpack:build] Completed', '[emitted]'];
      const strippedChunk = (0, _stripAnsi2.default)(chunk);
      let activated;
      if (_lodash2.default.includes(strippedChunk, "Finished 'default'")) {
        spinner.text = runMessageWatching;
      }
      if (_lodash2.default.some(ignoredLines, ignoredLine => _lodash2.default.includes(strippedChunk, ignoredLine))) {
        activated = false;
      } else {
        process.stdout.clearLine();
        process.stdout.cursorTo(0);
        activated = true;
      }
      return activated;
    });
    stdout.pipe(onBrowserSync).pipe(process.stdout);
  };
}