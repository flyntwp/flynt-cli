import * as composerInstall from '../install/composerInstall'
import * as yarnInstall from '../install/yarnInstall'
import * as createDb from '../create/createDb'

export const commands = {
  composerInstall,
  yarnInstall,
  createDb
}

export const cmds = Object.keys(commands)
