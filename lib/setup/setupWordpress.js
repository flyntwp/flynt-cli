'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.prompts = exports.requirements = undefined;
exports.run = run;

var _child_process = require('child_process');

var _child_process2 = _interopRequireDefault(_child_process);

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _prompts = require('../prompts');

var allPrompts = _interopRequireWildcard(_prompts);

var _requirements = require('../requirements');

var allRequirements = _interopRequireWildcard(_requirements);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var requirements = exports.requirements = [allRequirements.wpCli];

var prompts = exports.prompts = [allPrompts.dbName, allPrompts.dbUser, allPrompts.dbPassword, allPrompts.dbHost, allPrompts.wpEnv, allPrompts.wpHome, allPrompts.wpSiteurl, allPrompts.wpTitle, allPrompts.wpAdminName, allPrompts.wpAdminEmail];

function run(answers) {
  var cmds = ['wp dotenv init --with-salts', 'wp dotenv set DB_NAME ' + answers.dbName, 'wp dotenv set DB_USER ' + answers.dbUser, 'wp dotenv set DB_PASSWORD ' + answers.dbPassword, 'wp dotenv set DB_HOST ' + answers.dbHost, 'wp dotenv set WP_ENV ' + answers.wpEnv, 'wp dotenv set WP_HOME ' + answers.wpHome, 'wp dotenv set WP_SITEURL ' + answers.wpSiteurl, 'wp core install --url=' + answers.wpHome + ' --title=\'' + answers.wpTitle + '\' --admin_user=' + answers.wpAdminName + ' --admin_email=' + answers.wpAdminEmail];
  console.log('this is setupWordpress');
  return new _bluebird2.default(function (resolve, reject) {
    var exec = _child_process2.default.exec(cmds.join(' && '), function () {
      resolve();
    });
    exec.stdout.pipe(process.stdout);
    exec.stderr.pipe(process.stderr);
  });
}