'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.prompts = exports.requirements = undefined;
exports.run = run;

var _executeCommand = require('../utils/executeCommand');

var _executeCommand2 = _interopRequireDefault(_executeCommand);

var _requirements = require('../requirements');

var allRequirements = _interopRequireWildcard(_requirements);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var requirements = exports.requirements = [allRequirements.composer];

var prompts = exports.prompts = [];

function run(answers) {
  var cmds = ['composer config repositories.flyntCore git "git@github.com:bleech/wp-starter-plugin.git"', 'composer config repositories.acfFieldGroupComposer git "git@github.com:bleech/acf-field-group-composer.git"', 'composer require "timber/timber:~1.1" flyntwp/flynt-core:dev-master flyntwp/acf-field-group-composer:dev-master'];
  return (0, _executeCommand2.default)(cmds);
}