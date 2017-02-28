import * as db from './db'
import * as uploads from './uploads'

export const commands = {
  db,
  uploads
}

export const cmds = Object.keys(commands)
