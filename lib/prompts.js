'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var projectName = exports.projectName = {
  name: 'projectName',
  message: 'project (folder) name (will be created)',
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
  message: 'theme (folder) name',
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

var basePath = exports.basePath = multiEnvPrompt('basePath', basePathConfigFn);
var basePathRemote = exports.basePathRemote = multiEnvPrompt('basePath', basePathConfigFn, true);

var uploadsPath = exports.uploadsPath = multiEnvPrompt('uploadsPath', uploadsPathConfigFn);
var uploadsPathRemote = exports.uploadsPathRemote = multiEnvPrompt('uploadsPath', uploadsPathConfigFn, true);

var deployPath = exports.deployPath = multiEnvPrompt('deployPath', deployPathConfigFn);
var deployPathRemote = exports.deployPathRemote = multiEnvPrompt('deployPath', deployPathConfigFn, true);

var dbHost = exports.dbHost = multiEnvPrompt('dbHost', dbHostConfigFn);
var dbHostRemote = exports.dbHostRemote = multiEnvPrompt('dbHost', dbHostConfigFn, true);

var dbName = exports.dbName = multiEnvPrompt('dbName', dbNameConfigFn);
var dbNameRemote = exports.dbNameRemote = multiEnvPrompt('dbName', dbNameConfigFn, true);

var dbUser = exports.dbUser = multiEnvPrompt('dbUser', dbUserConfigFn);
var dbUserRemote = exports.dbUserRemote = multiEnvPrompt('dbUser', dbUserConfigFn, true);

var dbPassword = exports.dbPassword = multiEnvPrompt('dbPassword', dbPasswordConfigFn);
var dbPasswordRemote = exports.dbPasswordRemote = multiEnvPrompt('dbPassword', dbPasswordConfigFn, true);

var dbRootUser = exports.dbRootUser = multiEnvPrompt('dbRootUser', dbRootUserConfigFn);

var dbRootPassword = exports.dbRootPassword = multiEnvPrompt('dbRootPassword', dbRootPasswordConfigFn);

var sshHost = exports.sshHost = multiEnvPrompt('sshHost', sshHostConfigFn);
var sshHostRemote = exports.sshHostRemote = multiEnvPrompt('sshHost', sshHostConfigFn, true);

var sshUser = exports.sshUser = multiEnvPrompt('sshUser', sshUserConfigFn);
var sshUserRemote = exports.sshUserRemote = multiEnvPrompt('sshUser', sshUserConfigFn, true);

var sshPort = exports.sshPort = multiEnvPrompt('sshPort', sshPortConfigFn);
var sshPortRemote = exports.sshPortRemote = multiEnvPrompt('sshPort', sshPortConfigFn, true);

var wpHome = exports.wpHome = multiEnvPrompt('wpHome', wpHomeConfigFn);
var wpHomeRemote = exports.wpHomeRemote = multiEnvPrompt('wpHome', wpHomeConfigFn, true);

var wpEnv = exports.wpEnv = {
  name: 'wpEnv',
  message: 'WordPress environment (development, staging, production)',
  default: 'development'
};

var deployExcludes = exports.deployExcludes = {
  name: 'deployExcludes',
  message: 'deploy excludes (json array of rsync file patterns to exclude)',
  default: JSON.stringify(['.DS_Store', '.git', '.gitignore', '.gitkeep', '.gitmodules', '/.env.example', '/.env', '/.flynt.json', '/backup', '/CHANGELOG.md', '/LICENSE.md', '/phpcs.ruleset.xml', '/README.md', '/tests', '/tmp', '/web/.htaccess', '/web/.htpasswd', '/web/app/themes/hernie-website/Components', '/web/app/themes/hernie-website/gulpfile.js', '/web/app/uploads', '/web/usage', 'bower_components', 'node_modules']),
  filter: function filter(excludes) {
    if (excludes) {
      return JSON.parse(excludes);
    }
    return [];
  }
};

var rsyncFlags = exports.rsyncFlags = {
  name: 'rsyncFlags',
  message: 'rsync flags',
  default: '-chavzP --stats --delete'
};

var wpSiteurl = exports.wpSiteurl = {
  name: 'wpSiteurl',
  message: 'WordPress site url',
  default: function _default(answers) {
    if (answers.projectName) {
      return 'http://' + answers.projectName + '.dev/wp';
    }
  }
};

var wpTitle = exports.wpTitle = {
  name: 'wpTitle',
  message: 'WordPress site title'
};

var wpAdminName = exports.wpAdminName = {
  name: 'wpAdminName',
  message: 'WordPress admin user name'
};

var wpAdminEmail = exports.wpAdminEmail = {
  name: 'wpAdminEmail',
  message: 'WordPress admin email address'
};

var gitRepo = exports.gitRepo = {
  name: 'gitRepo',
  message: 'git repository url (eg. git@github.com:org/repo.git or https://github.com/org/repo.git)'
};

var acfProKey = exports.acfProKey = {
  name: 'acfProKey',
  message: 'ACF Pro license key'
};

var migrateDbProKey = exports.migrateDbProKey = {
  name: 'migrateDbProKey',
  message: 'WP Migrate DB Pro license key'
};

function basePathConfigFn(env, isRemote) {
  return {
    name: 'basePath' + (isRemote ? 'Remote' : ''),
    message: env + ' base path (should be relative for local environment)',
    default: function _default(answers) {
      return env === 'local' ? '.' : null;
    }
  };
}

function uploadsPathConfigFn(env, isRemote) {
  return {
    name: 'uploadsPath' + (isRemote ? 'Remote' : ''),
    message: 'relative (to base path) ' + env + ' uploads path',
    default: 'web/app/uploads'
  };
}

function deployPathConfigFn(env, isRemote) {
  return {
    name: 'deployPath' + (isRemote ? 'Remote' : ''),
    message: 'relative (to base path) ' + env + ' deploy path if it differs from base path',
    default: ''
  };
}

function dbHostConfigFn(env, isRemote) {
  return {
    name: 'dbHost' + (isRemote ? 'Remote' : ''),
    message: env + ' db host',
    default: 'localhost'
  };
}

function dbNameConfigFn(env, isRemote) {
  return {
    name: 'dbName' + (isRemote ? 'Remote' : ''),
    message: env + ' db name'
  };
}

function dbUserConfigFn(env, isRemote) {
  return {
    name: 'dbUser' + (isRemote ? 'Remote' : ''),
    message: env + ' db user'
  };
}

function dbPasswordConfigFn(env, isRemote) {
  return {
    name: 'dbPassword' + (isRemote ? 'Remote' : ''),
    message: env + ' db password',
    type: 'password'
  };
}

function dbRootUserConfigFn(env, isRemote) {
  return {
    name: 'dbRootUser' + (isRemote ? 'Remote' : ''),
    message: env + ' db root user'
  };
}

function dbRootPasswordConfigFn(env, isRemote) {
  return {
    name: 'dbRootPassword' + (isRemote ? 'Remote' : ''),
    message: env + ' db root password',
    type: 'password'
  };
}

function sshHostConfigFn(env, isRemote) {
  return {
    name: 'sshHost' + (isRemote ? 'Remote' : ''),
    message: env + ' ssh host',
    default: function _default(answers) {
      return env === 'local' ? '' : null;
    }
  };
}

function sshUserConfigFn(env, isRemote) {
  return {
    name: 'sshUser' + (isRemote ? 'Remote' : ''),
    message: env + ' ssh user',
    default: function _default(answers) {
      return env === 'local' ? '' : null;
    }
  };
}

function sshPortConfigFn(env, isRemote) {
  return {
    name: 'sshPort' + (isRemote ? 'Remote' : ''),
    message: env + ' ssh port',
    default: function _default(answers) {
      return env === 'local' ? '' : 22;
    }
  };
}

function wpHomeConfigFn(env, isRemote) {
  return {
    name: 'wpHome' + (isRemote ? 'Remote' : ''),
    message: env + ' WordPress home url (http://your.domain)',
    default: function _default(answers) {
      if (answers.projectName && env === 'local') {
        return 'http://' + answers.projectName + '.dev';
      }
    }
  };
}

function multiEnvPrompt(name, configFn, isRemote) {
  return function (fromEnv, toEnv) {
    var env = isRemote ? toEnv : fromEnv;
    return configFn(env, isRemote);
  };
}