import * as composerInstall from './composerInstall'
import * as yarnInstall from './yarnInstall'

export const commands = {
  composerInstall,
  yarnInstall
}

export const cmds = Object.keys(commands)
