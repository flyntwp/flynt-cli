export const projectName = {
  name: 'projectName',
  message: 'What is the project name? (name of folder in current directory)',
  validate: function (input) {
    if(/^[a-zA-Z0-9-]+$/.exec(input)) {
      return true
    } else {
      return 'The Project Name may only contain alphanumerical values and dashes.'
    }
  }
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
      return `http://${projectName}.dev`
    }
  }
}

export const wpSiteurl = {
  name: 'wpSiteurl',
  message: 'Wordpress Siteurl',
  default: function (answers) {
    if (answers.projectName) {
      return `http://${projectName}.dev/wp`
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
