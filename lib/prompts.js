'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var projectName = exports.projectName = {
  name: 'projectName',
  message: 'What is the project name? (name of newly created directory in current folder)',
  validate: function validate(input) {
    if (/^[a-zA-Z0-9-]+$/.exec(input)) {
      return true;
    } else {
      return 'The Project Name may only contain alphanumerical values and dashes.';
    }
  }
};

var themeName = exports.themeName = {
  name: 'themeName',
  message: 'What is name of the theme folder?',
  validate: function validate(input) {
    if (/^[a-zA-Z0-9-]+$/.exec(input)) {
      return true;
    } else {
      return 'The Project Name may only contain alphanumerical values and dashes.';
    }
  },
  default: function _default(answers) {
    if (answers.projectName) {
      return answers.projectName;
    }
  }
};

var basePath = exports.basePath = {
  name: 'basePath',
  message: 'Source Base Path'
};

var uploadsPath = exports.uploadsPath = {
  name: 'uploadsPath',
  message: 'Source Uploads Path'
};

var deployPath = exports.deployPath = {
  name: 'deployPath',
  message: 'Source Deploy Path'
};

var basePathRemote = exports.basePathRemote = {
  name: 'basePathRemote',
  message: 'Destination Base Path'
};

var uploadsPathRemote = exports.uploadsPathRemote = {
  name: 'uploadsPathRemote',
  message: 'Destination Uploads Path'
};

var deployPathRemote = exports.deployPathRemote = {
  name: 'deployPathRemote',
  message: 'Destination Deploy Path'
};

var deployExcludes = exports.deployExcludes = {
  name: 'deployExcludes',
  message: 'Source Deploy Excludes (json array of rsync file patterns to exclude)',
  default: JSON.stringify(['.git', 'node_modules', 'web/content/uploads', 'web/.htaccess', 'web/.htpasswd', 'web/usage', '.env', '.flynt.json', '/tmp/', '/backup/', '.DS_Store']),
  filter: function filter(excludes) {
    if (excludes) {
      return JSON.parse(excludes);
    }
    return [];
  }
};

var rsyncFlags = exports.rsyncFlags = {
  name: 'rsyncFlags',
  message: 'Source Rsync Flags',
  default: '-chavzP --stats'
};

var dbHost = exports.dbHost = {
  name: 'dbHost',
  message: 'Source Database Host',
  default: 'localhost'
};

var dbRootUser = exports.dbRootUser = {
  name: 'dbRootUser',
  message: 'Source Database Root User',
  default: 'root'
};

var dbRootPassword = exports.dbRootPassword = {
  name: 'dbRootPassword',
  message: 'Source Database Root Password',
  default: 'root'
};

var dbName = exports.dbName = {
  name: 'dbName',
  message: 'Source Database Name'
};

var dbUser = exports.dbUser = {
  name: 'dbUser',
  message: 'Source Database User Name'
};

var dbPassword = exports.dbPassword = {
  name: 'dbPassword',
  message: 'Source Database Password'
};

var sshHost = exports.sshHost = {
  name: 'sshHost',
  message: 'Source SSH Host'
};
var sshUser = exports.sshUser = {
  name: 'sshUser',
  message: 'Source SSH User'
};
var sshPort = exports.sshPort = {
  name: 'sshPort',
  message: 'Source SSH Port'
};

var dbHostRemote = exports.dbHostRemote = {
  name: 'dbHostRemote',
  message: 'Destination Database Host',
  default: 'localhost'
};

var dbNameRemote = exports.dbNameRemote = {
  name: 'dbNameRemote',
  message: 'Destination Database Name'
};

var dbUserRemote = exports.dbUserRemote = {
  name: 'dbUserRemote',
  message: 'Destination Database User Name'
};

var dbPasswordRemote = exports.dbPasswordRemote = {
  name: 'dbPasswordRemote',
  message: 'Destination Database Password'
};

var sshHostRemote = exports.sshHostRemote = {
  name: 'sshHostRemote',
  message: 'Destination SSH Host'
};
var sshUserRemote = exports.sshUserRemote = {
  name: 'sshUserRemote',
  message: 'Destination SSH User'
};
var sshPortRemote = exports.sshPortRemote = {
  name: 'sshPortRemote',
  message: 'Destination SSH Port'
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

var wpHomeRemote = exports.wpHomeRemote = {
  name: 'wpHomeRemote',
  message: 'Destination Wordpress Home Url',
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

var acfProKey = exports.acfProKey = {
  name: 'acfProKey',
  message: 'ACF Pro License Key'
};

var migrateDbProKey = exports.migrateDbProKey = {
  name: 'migrateDbProKey',
  message: 'WP Migrate DB Pro License Key'
};