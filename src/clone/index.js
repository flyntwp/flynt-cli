import * as cloneDb from './cloneDb'
import * as cloneUploads from './cloneUploads'

export const commands = {
  cloneDb,
  cloneUploads
}

export const cmds = Object.keys(commands)
