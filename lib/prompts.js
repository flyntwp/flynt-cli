'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var projectName = exports.projectName = {
  name: 'projectName',
  message: 'What is the project name? (name of folder in current directory)',
  validate: function validate(input) {
    if (/^[a-zA-Z0-9-]+$/.exec(input)) {
      return true;
    } else {
      return 'The Project Name may only contain alphanumerical values and dashes.';
    }
  }
};

var dbHost = exports.dbHost = {
  name: 'dbHost',
  message: 'Database Host',
  default: 'localhost'
};

var dbRootUser = exports.dbRootUser = {
  name: 'dbRootUser',
  message: 'Database Root User',
  default: 'root'
};

var dbRootPassword = exports.dbRootPassword = {
  name: 'dbRootPassword',
  message: 'Database Root Password',
  default: 'root'
};

var dbName = exports.dbName = {
  name: 'dbName',
  message: 'Database Name'
};

var dbUser = exports.dbUser = {
  name: 'dbUser',
  message: 'Database User Name'
};

var dbPassword = exports.dbPassword = {
  name: 'dbPassword',
  message: 'Database Password'
};

var wpEnv = exports.wpEnv = {
  name: 'wpEnv',
  message: 'Wordpress Environment (development, staging, production)',
  default: 'development'
};

var wpHome = exports.wpHome = {
  name: 'wpHome',
  message: 'Wordpress Home Url',
  default: function _default(answers) {
    if (answers.projectName) {
      return 'http://' + answers.projectName + '.dev';
    }
  }
};

var wpSiteurl = exports.wpSiteurl = {
  name: 'wpSiteurl',
  message: 'Wordpress Siteurl',
  default: function _default(answers) {
    if (answers.projectName) {
      return 'http://' + answers.projectName + '.dev/wp';
    }
  }
};

var wpTitle = exports.wpTitle = {
  name: 'wpTitle',
  message: 'Wordpress Site Title'
};

var wpAdminName = exports.wpAdminName = {
  name: 'wpAdminName',
  message: 'Wordpress Admin User Name'
};

var wpAdminEmail = exports.wpAdminEmail = {
  name: 'wpAdminEmail',
  message: 'Wordpress Admin Email Address'
};

var gitRepo = exports.gitRepo = {
  name: 'gitRepo',
  message: 'Git Repository URL (eg. git@github.com:org/repo.git or https://github.com/org/repo.git)'
};