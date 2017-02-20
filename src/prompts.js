export const projectName = {
  name: 'projectName',
  message: 'What is the project name? (name of newly created directory in current folder)',
  validate: function (input) {
    if (/^[a-zA-Z0-9-]+$/.exec(input)) {
      return true
    } else {
      return 'The Project Name may only contain alphanumerical values and dashes.'
    }
  }
}

export const themeName = {
  name: 'themeName',
  message: 'What is name of the theme folder?',
  validate: function (input) {
    if (/^[a-zA-Z0-9-]+$/.exec(input)) {
      return true
    } else {
      return 'The Project Name may only contain alphanumerical values and dashes.'
    }
  },
  default: function (answers) {
    if (answers.projectName) {
      return answers.projectName
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

export const wpEnv = {
  name: 'wpEnv',
  message: 'Wordpress Environment (development, staging, production)',
  default: 'development'
}

export const deployExcludes = {
  name: 'deployExcludes',
  message: 'Source Deploy Excludes (json array of rsync file patterns to exclude)',
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
    '/web/app/themes/hernie-website/Components',
    '/web/app/themes/hernie-website/gulpfile.js',
    '/web/app/uploads',
    '/web/usage',
    'bower_components',
    'node_modules'
  ]),
  filter: function (excludes) {
    if (excludes) {
      return JSON.parse(excludes)
    }
    return []
  }
}

export const rsyncFlags = {
  name: 'rsyncFlags',
  message: 'Source Rsync Flags',
  default: '-chavzP --stats'
}

export const wpSiteurl = {
  name: 'wpSiteurl',
  message: 'Wordpress Siteurl',
  default: function (answers) {
    if (answers.projectName) {
      return `http://${answers.projectName}.dev/wp`
    }
  }
}

export const wpTitle = {
  name: 'wpTitle',
  message: 'Wordpress Site Title'
}

export const wpAdminName = {
  name: 'wpAdminName',
  message: 'Wordpress Admin User Name'
}

export const wpAdminEmail = {
  name: 'wpAdminEmail',
  message: 'Wordpress Admin Email Address'
}

export const gitRepo = {
  name: 'gitRepo',
  message: 'Git Repository URL (eg. git@github.com:org/repo.git or https://github.com/org/repo.git)'
}

export const acfProKey = {
  name: 'acfProKey',
  message: 'ACF Pro License Key'
}

export const migrateDbProKey = {
  name: 'migrateDbProKey',
  message: 'WP Migrate DB Pro License Key'
}

function basePathConfigFn (env, isRemote) {
  return {
    name: `basePath${isRemote ? 'Remote' : ''}`,
    message: `${env} base path (should be relative for local environment)`,
    default: (answers) => env === 'local' ? '.' : null
  }
}

function uploadsPathConfigFn (env, isRemote) {
  return {
    name: `uploadsPath${isRemote ? 'Remote' : ''}`,
    message: `relative (to base path) ${env} uploads path`,
    default: 'web/app/uploads'
  }
}

function deployPathConfigFn (env, isRemote) {
  return {
    name: `deployPath${isRemote ? 'Remote' : ''}`,
    message: `relative (to base path) ${env} deploy path if it differs from base path`,
    default: ''
  }
}

function dbHostConfigFn (env, isRemote) {
  return {
    name: `dbHost${isRemote ? 'Remote' : ''}`,
    message: `${env} db host`,
    default: 'localhost'
  }
}

function dbNameConfigFn (env, isRemote) {
  return {
    name: `dbName${isRemote ? 'Remote' : ''}`,
    message: `${env} db name`
  }
}

function dbUserConfigFn (env, isRemote) {
  return {
    name: `dbUser${isRemote ? 'Remote' : ''}`,
    message: `${env} db user`
  }
}

function dbPasswordConfigFn (env, isRemote) {
  return {
    name: `dbPassword${isRemote ? 'Remote' : ''}`,
    message: `${env} db password`,
    type: 'password'
  }
}

function dbRootUserConfigFn (env, isRemote) {
  return {
    name: `dbRootUser${isRemote ? 'Remote' : ''}`,
    message: `${env} db root user`
  }
}

function dbRootPasswordConfigFn (env, isRemote) {
  return {
    name: `dbRootPassword${isRemote ? 'Remote' : ''}`,
    message: `${env} db root password`,
    type: 'password'
  }
}

function sshHostConfigFn (env, isRemote) {
  return {
    name: `sshHost${isRemote ? 'Remote' : ''}`,
    message: `${env} ssh host`,
    default: (answers) => env === 'local' ? '' : null
  }
}

function sshUserConfigFn (env, isRemote) {
  return {
    name: `sshUser${isRemote ? 'Remote' : ''}`,
    message: `${env} ssh user`,
    default: (answers) => env === 'local' ? '' : null
  }
}

function sshPortConfigFn (env, isRemote) {
  return {
    name: `sshPort${isRemote ? 'Remote' : ''}`,
    message: `${env} ssh port`,
    default: (answers) => env === 'local' ? '' : 22
  }
}

function wpHomeConfigFn (env, isRemote) {
  return {
    name: `wpHome${isRemote ? 'Remote' : ''}`,
    message: `${env} WordPress home url (http://your.domain)`,
    default: (answers) => {
      if (answers.projectName && env === 'local') {
        return `http://${answers.projectName}.dev`
      }
    }
  }
}

function multiEnvPrompt (name, configFn, isRemote) {
  return function (fromEnv, toEnv) {
    const env = isRemote ? toEnv : fromEnv
    return configFn(env, isRemote)
  }
}
