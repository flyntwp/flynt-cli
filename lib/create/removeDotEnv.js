'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.prompts = exports.requirements = exports.runMessage = exports.description = undefined;
exports.run = run;

var _executeCommand = require('../utils/executeCommand');

var _executeCommand2 = _interopRequireDefault(_executeCommand);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const description = exports.description = 'initialize new git repo and push to origin';

const runMessage = exports.runMessage = 'Initializing git repo...';

const requirements = exports.requirements = [];

const prompts = exports.prompts = [];

function run(answers) {
  let cmds = ['rm .env'];
  return (0, _executeCommand2.default)(cmds);
}