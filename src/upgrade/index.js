import * as composerUpdate from './composerUpdate'
import * as yarnUpgrade from './yarnUpgrade'

export const commands = {
  composerUpdate,
  yarnUpgrade
}

export const cmds = Object.keys(commands)
