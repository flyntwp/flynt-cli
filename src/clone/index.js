import * as db from './db'
import * as uploads from './uploads'

export const commands = {
  db,
  uploads
}

export const cmds = Object.keys(commands)

export const description = 'clone database and media files between environments'
