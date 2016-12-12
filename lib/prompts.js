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

var dbHost = exports.dbHost = {
  name: 'dbHost',
  message: 'Database Host'
};

var wpEnv = exports.wpEnv = {
  name: 'wpEnv',
  message: 'Wordpress Environment (development, staging, production)'
};

var wpHome = exports.wpHome = {
  name: 'wpHome',
  message: 'Wordpress Home Url'
};

var wpSiteUrl = exports.wpSiteUrl = {
  name: 'wpSiteUrl',
  message: 'Wordpress Site Url'
};

var wpAdminName = exports.wpAdminName = {
  name: 'wpAdminName',
  message: 'Wordpress Admin User Name'
};

var wpAdminEmail = exports.wpAdminEmail = {
  name: 'wpAdminEmail',
  message: 'Wordpress Admin Email Address'
};