function filterJsonArray (input) {
  return input ? JSON.parse(input) : []
}

export const projectName = {
  name: 'projectName',
  message: 'project (folder) name (will be created)',
  validate: function (input) {
    if (/^[a-zA-Z0-9-]+$/.exec(input)) {
      return true
    } else {
      return 'The project name may only contain alphanumerical values and dashes.'
    }
  }
}

export const themeName = function (config) {
  return {
    name: 'themeName',
    message: 'theme (folder) name',
    validate: function (input) {
      if (/^[a-zA-Z0-9-]+$/.exec(input)) {
        return true
      } else {
        return 'The theme name may only contain alphanumerical values and dashes.'
      }
    },
    default: function (answers) {
      let projectName = answers.projectName || config.projectName
      if (projectName) {
        return projectName
      }
    }
  }
}

export const basePath = multiEnvPrompt('basePath', basePathConfigFn)
export const basePathRemote = multiEnvPrompt('basePath', basePathConfigFn, true)

export const uploadsPath = multiEnvPrompt('uploadsPath', uploadsPathConfigFn)
export const uploadsPathRemote = multiEnvPrompt('uploadsPath', uploadsPathConfigFn, true)

export const deployPath = multiEnvPrompt('deployPath', deployPathConfigFn)
export const deployPathRemote = multiEnvPrompt('deployPath', deployPathConfigFn, true)

export const dbHost = multiEnvPrompt('dbHost', dbHostConfigFn)
export const dbHostRemote = multiEnvPrompt('dbHost', dbHostConfigFn, true)

export const dbName = multiEnvPrompt('dbName', dbNameConfigFn)
export const dbNameRemote = multiEnvPrompt('dbName', dbNameConfigFn, true)

export const dbUser = multiEnvPrompt('dbUser', dbUserConfigFn)
export const dbUserRemote = multiEnvPrompt('dbUser', dbUserConfigFn, true)

export const dbPassword = multiEnvPrompt('dbPassword', dbPasswordConfigFn)
export const dbPasswordRemote = multiEnvPrompt('dbPassword', dbPasswordConfigFn, true)

export const dbPort = multiEnvPrompt('dbPort', dbPortConfigFn)
export const dbPortRemote = multiEnvPrompt('dbPort', dbPortConfigFn, true)

export const dbSocket = multiEnvPrompt('dbSocket', dbSocketConfigFn)
export const dbSocketRemote = multiEnvPrompt('dbSocket', dbSocketConfigFn, true)

export const dbRootUser = multiEnvPrompt('dbRootUser', dbRootUserConfigFn)

export const dbRootPassword = multiEnvPrompt('dbRootPassword', dbRootPasswordConfigFn)

export const sshHost = multiEnvPrompt('sshHost', sshHostConfigFn)
export const sshHostRemote = multiEnvPrompt('sshHost', sshHostConfigFn, true)

export const sshUser = multiEnvPrompt('sshUser', sshUserConfigFn)
export const sshUserRemote = multiEnvPrompt('sshUser', sshUserConfigFn, true)

export const sshPort = multiEnvPrompt('sshPort', sshPortConfigFn)
export const sshPortRemote = multiEnvPrompt('sshPort', sshPortConfigFn, true)

export const wpHome = multiEnvPrompt('wpHome', wpHomeConfigFn)
export const wpHomeRemote = multiEnvPrompt('wpHome', wpHomeConfigFn, true)

export const searchReplaceStrings = multiEnvPrompt('searchReplaceStrings', searchReplaceStringsConfigFn)
export const searchReplaceStringsRemote = multiEnvPrompt('searchReplaceStrings', searchReplaceStringsConfigFn, true)

export const wpEnv = {
  name: 'wpEnv',
  message: 'WordPress environment (development, staging, production)',
  default: 'development'
}

export const deployExcludes = {
  name: 'deployExcludes',
  message: 'deploy excludes (json array of rsync file patterns to exclude)',
  default: JSON.stringify([
    '.DS_Store',
    '.git',
    '.gitignore',
    '.gitkeep',
    '.gitmodules',
    '/.env.example',
    '/.env',
    '/.flynt.json',
    '/backup',
    '/CHANGELOG.md',
    '/LICENSE.md',
    '/phpcs.ruleset.xml',
    '/README.md',
    '/tests',
    '/tmp',
    '/web/.htaccess',
    '/web/.htpasswd',
    '/web/app/uploads',
    '/web/usage',
    'bower_components',
    'node_modules'
  ]),
  filter: filterJsonArray
}

export const rsyncFlags = {
  name: 'rsyncFlags',
  message: 'rsync flags',
  default: '-chavzP --stats --delete'
}

export const wpSiteurl = function (config) {
  return {
    name: 'wpSiteurl',
    message: 'WordPress site url',
    default: function (answers) {
      let projectName = answers.projectName || config.projectName
      if (projectName) {
        return `http://${projectName}.dev/wp`
      }
    }
  }
}

export const wpTitle = {
  name: 'wpTitle',
  message: 'WordPress site title'
}

export const wpAdminName = {
  name: 'wpAdminName',
  message: 'WordPress admin user name'
}

export const wpAdminEmail = {
  name: 'wpAdminEmail',
  message: 'WordPress admin email address'
}

export const gitRepo = {
  name: 'gitRepo',
  message: 'git repository url (eg. git@github.com:org/repo.git or https://github.com/org/repo.git)'
}

export const acfProKey = {
  name: 'acfProKey',
  message: 'ACF Pro license key'
}

export const composerRepos = {
  name: 'composerRepos',
  message: 'additional PHP composer repositories (separated by space)',
  filter: (input) => input.length ? input.split(' ') : null
}

export const composerPackages = {
  name: 'composerPackages',
  message: 'additional PHP composer packages (separated by space)',
  filter: (input) => input.length ? input.split(' ') : null
}

function basePathConfigFn (config, env, isRemote) {
  return {
    name: `basePath${isRemote ? 'Remote' : ''}`,
    message: `${env} base path (should be relative for local environment)`,
    default: (answers) => env === 'local' ? '.' : process.cwd()
  }
}

function uploadsPathConfigFn (config, env, isRemote) {
  return {
    name: `uploadsPath${isRemote ? 'Remote' : ''}`,
    message: `relative (to base path) ${env} uploads path`,
    default: 'web/app/uploads'
  }
}

function deployPathConfigFn (config, env, isRemote) {
  return {
    name: `deployPath${isRemote ? 'Remote' : ''}`,
    message: `relative (to base path) ${env} deploy path if it differs from base path (default is empty)`,
    default: ''
  }
}

function dbHostConfigFn (config, env, isRemote) {
  return {
    name: `dbHost${isRemote ? 'Remote' : ''}`,
    message: `${env} db host`,
    default: 'localhost'
  }
}

function dbNameConfigFn (config, env, isRemote) {
  return {
    name: `dbName${isRemote ? 'Remote' : ''}`,
    message: `${env} db name`
  }
}

function dbUserConfigFn (config, env, isRemote) {
  return {
    name: `dbUser${isRemote ? 'Remote' : ''}`,
    message: `${env} db user`
  }
}

function dbPasswordConfigFn (config, env, isRemote) {
  return {
    name: `dbPassword${isRemote ? 'Remote' : ''}`,
    message: `${env} db password`,
    type: 'password'
  }
}

function dbPortConfigFn (config, env, isRemote) {
  return {
    name: `dbPort${isRemote ? 'Remote' : ''}`,
    message: `${env} db port`,
    default: 3306
  }
}

function dbSocketConfigFn (config, env, isRemote) {
  return {
    name: `dbSocket${isRemote ? 'Remote' : ''}`,
    message: `${env} db socket`
  }
}

function dbRootUserConfigFn (config, env, isRemote) {
  return {
    name: `dbRootUser${isRemote ? 'Remote' : ''}`,
    message: `${env} db root user`
  }
}

function dbRootPasswordConfigFn (config, env, isRemote) {
  return {
    name: `dbRootPassword${isRemote ? 'Remote' : ''}`,
    message: `${env} db root password`,
    type: 'password'
  }
}

function sshHostConfigFn (config, env, isRemote) {
  return {
    name: `sshHost${isRemote ? 'Remote' : ''}`,
    message: `${env} ssh host`,
    default: (answers) => env === 'local' ? '' : null
  }
}

function sshUserConfigFn (config, env, isRemote) {
  return {
    name: `sshUser${isRemote ? 'Remote' : ''}`,
    message: `${env} ssh user`,
    default: (answers) => env === 'local' ? '' : null
  }
}

function sshPortConfigFn (config, env, isRemote) {
  return {
    name: `sshPort${isRemote ? 'Remote' : ''}`,
    message: `${env} ssh port`,
    default: (answers) => env === 'local' ? '' : 22
  }
}

function wpHomeConfigFn (config, env, isRemote) {
  return {
    name: `wpHome${isRemote ? 'Remote' : ''}`,
    message: `${env} WordPress home url (http://your.domain)`,
    default: (answers) => {
      let projectName = answers.projectName || config.projectName
      if (projectName && env === 'local') {
        return `http://${projectName}.dev`
      }
    }
  }
}

function searchReplaceStringsConfigFn (config, env, isRemote) {
  return {
    name: `searchReplaceStrings${isRemote ? 'Remote' : ''}`,
    message: `${isRemote ? 'replace' : 'search'} strings for db search & replace, in addition to wpHome and basePath (JSON array of strings)`,
    filter: filterJsonArray
  }
}

function multiEnvPrompt (name, configFn, isRemote) {
  return function (config, fromEnv, toEnv) {
    const env = isRemote ? toEnv : fromEnv
    return configFn(config, env, isRemote)
  }
}
