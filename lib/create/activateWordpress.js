'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.prompts = exports.requirements = exports.description = undefined;
exports.run = run;

var _executeCommand = require('../utils/executeCommand');

var _executeCommand2 = _interopRequireDefault(_executeCommand);

var _prompts = require('../prompts');

var allPrompts = _interopRequireWildcard(_prompts);

var _requirements = require('../requirements');

var allRequirements = _interopRequireWildcard(_requirements);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const description = exports.description = 'activate WordPress theme and plugins';

const requirements = exports.requirements = [allRequirements.wpCli];

const prompts = exports.prompts = [allPrompts.themeName];

function run(answers) {
  let cmds = ['wp option set blog_public 0', `wp theme activate ${answers.themeName}`, 'echo "apache_modules:\n  - mod_rewrite\n" >> wp-cli.yml', 'wp rewrite structure /%postname%/ --hard', 'wp plugin activate --all'];
  return (0, _executeCommand2.default)(cmds);
}