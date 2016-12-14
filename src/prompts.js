export const projectName = {
  name: 'projectName',
  message: 'What is the project name? (name of folder in current directory)',
  validate: function (input) {
    if (/^[a-zA-Z0-9-]+$/.exec(input)) {
      return true
    } else {
      return 'The Project Name may only contain alphanumerical values and dashes.'
    }
  }
}

export const basePath = {
  name: 'basePath',
  message: 'Local Base Path'
}

export const uploadsPath = {
  name: 'uploadsPath',
  message: 'Local Uploads Path'
}

export const deployPath = {
  name: 'deployPath',
  message: 'Local Deploy Path'
}

export const basePathRemote = {
  name: 'basePathRemote',
  message: 'Remote Base Path'
}

export const uploadsPathRemote = {
  name: 'uploadsPathRemote',
  message: 'Remote Uploads Path'
}

export const deployPathRemote = {
  name: 'deployPathRemote',
  message: 'Remote Deploy Path'
}

export const deployExcludes = {
  name: 'deployExcludes',
  message: 'Local Deploy Excludes (json array of rsync file patterns to exclude)',
  default: JSON.stringify([
    '.git',
    'node_modules',
    'web/content/uploads',
    'web/.htaccess',
    'web/.htpasswd',
    'web/usage',
    '.env',
    '.flynt.json',
    '/tmp/',
    '/backup/',
    '.DS_Store'
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
  message: 'Rsync Flags',
  default: '-chavzP --stats'
}

export const dbHost = {
  name: 'dbHost',
  message: 'Database Host',
  default: 'localhost'
}

export const dbRootUser = {
  name: 'dbRootUser',
  message: 'Database Root User',
  default: 'root'
}

export const dbRootPassword = {
  name: 'dbRootPassword',
  message: 'Database Root Password',
  default: 'root'
}

export const dbName = {
  name: 'dbName',
  message: 'Database Name'
}

export const dbUser = {
  name: 'dbUser',
  message: 'Database User Name'
}

export const dbPassword = {
  name: 'dbPassword',
  message: 'Database Password'
}

export const sshHost = {
  name: 'sshHost',
  message: 'SSH Host'
}
export const sshUser = {
  name: 'sshUser',
  message: 'SSH User'
}
export const sshPort = {
  name: 'sshPort',
  message: 'SSH Port'
}

export const dbHostRemote = {
  name: 'dbHostRemote',
  message: 'Remote Database Host',
  default: 'localhost'
}

export const dbNameRemote = {
  name: 'dbNameRemote',
  message: 'Remote Database Name'
}

export const dbUserRemote = {
  name: 'dbUserRemote',
  message: 'Remote Database User Name'
}

export const dbPasswordRemote = {
  name: 'dbPasswordRemote',
  message: 'Remote Database Password'
}

export const sshHostRemote = {
  name: 'sshHostRemote',
  message: 'Remote SSH Host'
}
export const sshUserRemote = {
  name: 'sshUserRemote',
  message: 'Remote SSH User'
}
export const sshPortRemote = {
  name: 'sshPortRemote',
  message: 'Remote SSH Port'
}

export const wpEnv = {
  name: 'wpEnv',
  message: 'Wordpress Environment (development, staging, production)',
  default: 'development'
}

export const wpHome = {
  name: 'wpHome',
  message: 'Wordpress Home Url',
  default: function (answers) {
    if (answers.projectName) {
      return `http://${answers.projectName}.dev`
    }
  }
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
