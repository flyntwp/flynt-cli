import * as composerInstall from './composerInstall'
import * as yarnInstall from './yarnInstall'
import * as bowerInstall from './bowerInstall'

export const commands = {
  composerInstall,
  yarnInstall,
  bowerInstall
}

export const cmds = Object.keys(commands)
