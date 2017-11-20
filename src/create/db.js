import exec from '../utils/executeCommand'

import * as allPrompts from '../prompts'
import * as allRequirements from '../requirements'

export const description = 'create the database with root user for specified user'

export const runMessage = 'Creating database...'

export const requirements = [
  allRequirements.mysql
]

export const prompts = [
  allPrompts.dbHost,
  allPrompts.dbRootUser,
  allPrompts.dbRootPassword,
  allPrompts.dbName,
  allPrompts.dbUser,
  allPrompts.dbPassword,
  allPrompts.dbPort,
  allPrompts.dbSocket
]

export function run (answers) {
  let cmds = [
    `mysql --host=${answers.dbHost} --user=${answers.dbRootUser} --password=${answers.dbRootPassword} ${answers.dbPort ? `--port ${answers.dbPort}` : ''} ${answers.dbSocket ? `--socket ${answers.dbSocket}` : ''} -e \
      "CREATE DATABASE IF NOT EXISTS ${answers.dbName}; \
      CREATE USER '${answers.dbUser}'@'${answers.dbHost}' IDENTIFIED BY '${answers.dbPassword}'; \
      GRANT ALL PRIVILEGES ON ${answers.dbName} . * TO '${answers.dbUser}'@'${answers.dbHost}'; \
      FLUSH PRIVILEGES;"`
  ]
  return exec(cmds)
}
