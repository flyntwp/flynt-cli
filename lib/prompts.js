'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
function filterJsonArray(input) {
  return input ? JSON.parse(input) : [];
}

const projectName = exports.projectName = {
  name: 'projectName',
  message: 'project (folder) name (will be created)',
  validate: function validate(input) {
    if (/^[a-zA-Z0-9-]+$/.exec(input)) {
      return true;
    } else {
      return 'The project name may only contain alphanumerical values and dashes.';
    }
  }
};

const themeName = exports.themeName = {
  name: 'themeName',
  message: 'theme (folder) name',
  validate: function validate(input) {
    if (/^[a-zA-Z0-9-]+$/.exec(input)) {
      return true;
    } else {
      return 'The theme name may only contain alphanumerical values and dashes.';
    }
  },
  default: function _default(answers) {
    if (answers.projectName) {
      return answers.projectName;
    }
  }
};

const basePath = exports.basePath = multiEnvPrompt('basePath', basePathConfigFn);
const basePathRemote = exports.basePathRemote = multiEnvPrompt('basePath', basePathConfigFn, true);

const uploadsPath = exports.uploadsPath = multiEnvPrompt('uploadsPath', uploadsPathConfigFn);
const uploadsPathRemote = exports.uploadsPathRemote = multiEnvPrompt('uploadsPath', uploadsPathConfigFn, true);

const deployPath = exports.deployPath = multiEnvPrompt('deployPath', deployPathConfigFn);
const deployPathRemote = exports.deployPathRemote = multiEnvPrompt('deployPath', deployPathConfigFn, true);

const dbHost = exports.dbHost = multiEnvPrompt('dbHost', dbHostConfigFn);
const dbHostRemote = exports.dbHostRemote = multiEnvPrompt('dbHost', dbHostConfigFn, true);

const dbName = exports.dbName = multiEnvPrompt('dbName', dbNameConfigFn);
const dbNameRemote = exports.dbNameRemote = multiEnvPrompt('dbName', dbNameConfigFn, true);

const dbUser = exports.dbUser = multiEnvPrompt('dbUser', dbUserConfigFn);
const dbUserRemote = exports.dbUserRemote = multiEnvPrompt('dbUser', dbUserConfigFn, true);

const dbPassword = exports.dbPassword = multiEnvPrompt('dbPassword', dbPasswordConfigFn);
const dbPasswordRemote = exports.dbPasswordRemote = multiEnvPrompt('dbPassword', dbPasswordConfigFn, true);

const dbRootUser = exports.dbRootUser = multiEnvPrompt('dbRootUser', dbRootUserConfigFn);

const dbRootPassword = exports.dbRootPassword = multiEnvPrompt('dbRootPassword', dbRootPasswordConfigFn);

const sshHost = exports.sshHost = multiEnvPrompt('sshHost', sshHostConfigFn);
const sshHostRemote = exports.sshHostRemote = multiEnvPrompt('sshHost', sshHostConfigFn, true);

const sshUser = exports.sshUser = multiEnvPrompt('sshUser', sshUserConfigFn);
const sshUserRemote = exports.sshUserRemote = multiEnvPrompt('sshUser', sshUserConfigFn, true);

const sshPort = exports.sshPort = multiEnvPrompt('sshPort', sshPortConfigFn);
const sshPortRemote = exports.sshPortRemote = multiEnvPrompt('sshPort', sshPortConfigFn, true);

const wpHome = exports.wpHome = multiEnvPrompt('wpHome', wpHomeConfigFn);
const wpHomeRemote = exports.wpHomeRemote = multiEnvPrompt('wpHome', wpHomeConfigFn, true);

const searchReplaceStrings = exports.searchReplaceStrings = multiEnvPrompt('searchReplaceStrings', searchReplaceStringsConfigFn);
const searchReplaceStringsRemote = exports.searchReplaceStringsRemote = multiEnvPrompt('searchReplaceStrings', searchReplaceStringsConfigFn, true);

const wpEnv = exports.wpEnv = {
  name: 'wpEnv',
  message: 'WordPress environment (development, staging, production)',
  default: 'development'
};

const deployExcludes = exports.deployExcludes = {
  name: 'deployExcludes',
  message: 'deploy excludes (json array of rsync file patterns to exclude)',
  default: JSON.stringify(['.DS_Store', '.git', '.gitignore', '.gitkeep', '.gitmodules', '/.env.example', '/.env', '/.flynt.json', '/backup', '/CHANGELOG.md', '/LICENSE.md', '/phpcs.ruleset.xml', '/README.md', '/tests', '/tmp', '/web/.htaccess', '/web/.htpasswd', '/web/app/uploads', '/web/usage', 'bower_components', 'node_modules']),
  filter: filterJsonArray
};

const rsyncFlags = exports.rsyncFlags = {
  name: 'rsyncFlags',
  message: 'rsync flags',
  default: '-chavzP --stats --delete'
};

const wpSiteurl = exports.wpSiteurl = {
  name: 'wpSiteurl',
  message: 'WordPress site url',
  default: function _default(answers) {
    if (answers.projectName) {
      return `http://${ answers.projectName }.dev/wp`;
    }
  }
};

const wpTitle = exports.wpTitle = {
  name: 'wpTitle',
  message: 'WordPress site title'
};

const wpAdminName = exports.wpAdminName = {
  name: 'wpAdminName',
  message: 'WordPress admin user name'
};

const wpAdminEmail = exports.wpAdminEmail = {
  name: 'wpAdminEmail',
  message: 'WordPress admin email address'
};

const gitRepo = exports.gitRepo = {
  name: 'gitRepo',
  message: 'git repository url (eg. git@github.com:org/repo.git or https://github.com/org/repo.git)'
};

const acfProKey = exports.acfProKey = {
  name: 'acfProKey',
  message: 'ACF Pro license key'
};

const composerRepos = exports.composerRepos = {
  name: 'composerRepos',
  message: 'additional PHP composer repositories (separated by space)',
  filter: input => input.length ? input.split(' ') : null
};

const composerPackages = exports.composerPackages = {
  name: 'composerPackages',
  message: 'additional PHP composer packages (separated by space)',
  filter: input => input.length ? input.split(' ') : null
};

function basePathConfigFn(env, isRemote) {
  return {
    name: `basePath${ isRemote ? 'Remote' : '' }`,
    message: `${ env } base path (should be relative for local environment)`,
    default: answers => env === 'local' ? '.' : null
  };
}

function uploadsPathConfigFn(env, isRemote) {
  return {
    name: `uploadsPath${ isRemote ? 'Remote' : '' }`,
    message: `relative (to base path) ${ env } uploads path`,
    default: 'web/app/uploads'
  };
}

function deployPathConfigFn(env, isRemote) {
  return {
    name: `deployPath${ isRemote ? 'Remote' : '' }`,
    message: `relative (to base path) ${ env } deploy path if it differs from base path`,
    default: ''
  };
}

function dbHostConfigFn(env, isRemote) {
  return {
    name: `dbHost${ isRemote ? 'Remote' : '' }`,
    message: `${ env } db host`,
    default: 'localhost'
  };
}

function dbNameConfigFn(env, isRemote) {
  return {
    name: `dbName${ isRemote ? 'Remote' : '' }`,
    message: `${ env } db name`
  };
}

function dbUserConfigFn(env, isRemote) {
  return {
    name: `dbUser${ isRemote ? 'Remote' : '' }`,
    message: `${ env } db user`
  };
}

function dbPasswordConfigFn(env, isRemote) {
  return {
    name: `dbPassword${ isRemote ? 'Remote' : '' }`,
    message: `${ env } db password`,
    type: 'password'
  };
}

function dbRootUserConfigFn(env, isRemote) {
  return {
    name: `dbRootUser${ isRemote ? 'Remote' : '' }`,
    message: `${ env } db root user`
  };
}

function dbRootPasswordConfigFn(env, isRemote) {
  return {
    name: `dbRootPassword${ isRemote ? 'Remote' : '' }`,
    message: `${ env } db root password`,
    type: 'password'
  };
}

function sshHostConfigFn(env, isRemote) {
  return {
    name: `sshHost${ isRemote ? 'Remote' : '' }`,
    message: `${ env } ssh host`,
    default: answers => env === 'local' ? '' : null
  };
}

function sshUserConfigFn(env, isRemote) {
  return {
    name: `sshUser${ isRemote ? 'Remote' : '' }`,
    message: `${ env } ssh user`,
    default: answers => env === 'local' ? '' : null
  };
}

function sshPortConfigFn(env, isRemote) {
  return {
    name: `sshPort${ isRemote ? 'Remote' : '' }`,
    message: `${ env } ssh port`,
    default: answers => env === 'local' ? '' : 22
  };
}

function wpHomeConfigFn(env, isRemote) {
  return {
    name: `wpHome${ isRemote ? 'Remote' : '' }`,
    message: `${ env } WordPress home url (http://your.domain)`,
    default: answers => {
      if (answers.projectName && env === 'local') {
        return `http://${ answers.projectName }.dev`;
      }
    }
  };
}

function searchReplaceStringsConfigFn(env, isRemote) {
  return {
    name: `searchReplaceStrings${ isRemote ? 'Remote' : '' }`,
    message: `${ isRemote ? 'replace' : 'search' } strings for db search & replace, in addition to wpHome and basePath (JSON array of strings)`,
    filter: filterJsonArray
  };
}

function multiEnvPrompt(name, configFn, isRemote) {
  return function (fromEnv, toEnv) {
    const env = isRemote ? toEnv : fromEnv;
    return configFn(env, isRemote);
  };
}