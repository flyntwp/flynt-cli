'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.prompts = exports.requirements = exports.runMessage = exports.description = undefined;
exports.run = run;

var _executeCommand = require('../utils/executeCommand');

var _executeCommand2 = _interopRequireDefault(_executeCommand);

var _requirements = require('../requirements');

var allRequirements = _interopRequireWildcard(_requirements);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const description = exports.description = 'upgrade project dependencies with composer';

const runMessage = exports.runMessage = 'Upgrading PHP composer dependencies...';

const requirements = exports.requirements = [allRequirements.composer];

const prompts = exports.prompts = [];

function run(answers) {
  const cmds = ['composer update'];
  return (0, _executeCommand2.default)(cmds);
}