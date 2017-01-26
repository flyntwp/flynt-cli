'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.prompts = exports.requirements = undefined;
exports.run = run;

var _executeCommand = require('../utils/executeCommand');

var _executeCommand2 = _interopRequireDefault(_executeCommand);

var _prompts = require('../prompts');

var allPrompts = _interopRequireWildcard(_prompts);

var _requirements = require('../requirements');

var allRequirements = _interopRequireWildcard(_requirements);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var requirements = exports.requirements = [allRequirements.wpCli];

var prompts = exports.prompts = [allPrompts.projectName];

function run(answers) {
  var cmds = ['wp option set blog_public 0', 'wp theme activate ' + answers.projectName, 'echo "apache_modules:\n  - mod_rewrite\n" >> wp-cli.yml', 'wp rewrite flush --hard'
  // 'plugin activate acf-role-selector-field',
  // 'plugin activate advanced-custom-fields-pro',
  // 'plugin activate wp-h5bp-htaccess ',
  // 'plugin activate wp-migrate-db-pro',
  // 'plugin activate wp-migrate-db-pro-cli',
  // 'plugin activate wp-migrate-db-pro-media-files',
  ];
  return (0, _executeCommand2.default)(cmds);
}