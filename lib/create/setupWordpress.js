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

const description = exports.description = 'set dotenv values and isntall WordPress db';

const requirements = exports.requirements = [allRequirements.wpCli, allRequirements.wpCliDotenv];

const prompts = exports.prompts = [allPrompts.dbName, allPrompts.dbUser, allPrompts.dbPassword, allPrompts.dbHost, allPrompts.wpEnv, allPrompts.wpHome, allPrompts.wpSiteurl, allPrompts.wpTitle, allPrompts.wpAdminName, allPrompts.wpAdminEmail, allPrompts.acfProKey];

function run(answers) {
  const cmds = ['wp dotenv init --with-salts', `wp dotenv set DB_NAME ${ answers.dbName }`, `wp dotenv set DB_USER ${ answers.dbUser }`, `wp dotenv set DB_PASSWORD ${ answers.dbPassword }`, `wp dotenv set DB_HOST ${ answers.dbHost }`, `wp dotenv set WP_ENV ${ answers.wpEnv }`, `wp dotenv set WP_HOME ${ answers.wpHome }`, `wp dotenv set WP_SITEURL ${ answers.wpSiteurl }`];
  if (answers.acfProKey) {
    cmds.push(`wp dotenv set ACF_PRO_KEY ${ answers.acfProKey }`);
  }
  cmds.push(`wp core install --url=${ answers.wpHome } --title='${ answers.wpTitle }' --admin_user=${ answers.wpAdminName } --admin_email=${ answers.wpAdminEmail }`);
  return (0, _executeCommand2.default)(cmds);
}