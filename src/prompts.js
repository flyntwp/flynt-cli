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

export const basePath = {
  name: 'basePath',
  message: 'Source Base Path'
}

export const uploadsPath = {
  name: 'uploadsPath',
  message: 'Source Uploads Path'
}

export const deployPath = {
  name: 'deployPath',
  message: 'Source Deploy Path'
}

export const basePathRemote = {
  name: 'basePathRemote',
  message: 'Destination Base Path'
}

export const uploadsPathRemote = {
  name: 'uploadsPathRemote',
  message: 'Destination Uploads Path'
}

export const deployPathRemote = {
  name: 'deployPathRemote',
  message: 'Destination Deploy Path'
}

export const deployExcludes = {
  name: 'deployExcludes',
  message: 'Source Deploy Excludes (json array of rsync file patterns to exclude)',
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
  message: 'Source Rsync Flags',
  default: '-chavzP --stats'
}

export const dbHost = {
  name: 'dbHost',
  message: 'Source Database Host',
  default: 'localhost'
}

export const dbRootUser = {
  name: 'dbRootUser',
  message: 'Source Database Root User',
  default: 'root'
}

export const dbRootPassword = {
  name: 'dbRootPassword',
  message: 'Source Database Root Password',
  default: 'root'
}

export const dbName = {
  name: 'dbName',
  message: 'Source Database Name'
}

export const dbUser = {
  name: 'dbUser',
  message: 'Source Database User Name'
}

export const dbPassword = {
  name: 'dbPassword',
  message: 'Source Database Password'
}

export const sshHost = {
  name: 'sshHost',
  message: 'Source SSH Host'
}
export const sshUser = {
  name: 'sshUser',
  message: 'Source SSH User'
}
export const sshPort = {
  name: 'sshPort',
  message: 'Source SSH Port'
}

export const dbHostRemote = {
  name: 'dbHostRemote',
  message: 'Destination Database Host',
  default: 'localhost'
}

export const dbNameRemote = {
  name: 'dbNameRemote',
  message: 'Destination Database Name'
}

export const dbUserRemote = {
  name: 'dbUserRemote',
  message: 'Destination Database User Name'
}

export const dbPasswordRemote = {
  name: 'dbPasswordRemote',
  message: 'Destination Database Password'
}

export const sshHostRemote = {
  name: 'sshHostRemote',
  message: 'Destination SSH Host'
}
export const sshUserRemote = {
  name: 'sshUserRemote',
  message: 'Destination SSH User'
}
export const sshPortRemote = {
  name: 'sshPortRemote',
  message: 'Destination SSH Port'
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

export const wpHomeRemote = {
  name: 'wpHomeRemote',
  message: 'Destination Wordpress Home Url',
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

export const acfProKey = {
  name: 'acfProKey',
  message: 'ACF Pro License Key'
}

export const migrateDbProKey = {
  name: 'migrateDbProKey',
  message: 'WP Migrate DB Pro License Key'
}
