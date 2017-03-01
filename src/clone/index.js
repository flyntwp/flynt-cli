import * as db from './db'
import * as uploads from './uploads'

export const commands = {
  db,
  uploads
}

export const cmds = Object.keys(commands)

export const description = 'clone database and media files between environments'

export const options = {
  from: {
    describe: 'Environment to clone from',
    type: 'string',
    default: 'development'
  },
  to: {
    describe: 'Environment to clone to',
    type: 'string',
    default: 'local'
  }
}
