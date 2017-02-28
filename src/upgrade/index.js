import * as composerUpdate from './composerUpdate'
import * as yarnUpgrade from './yarnUpgrade'
import * as bowerUpdate from './bowerUpdate'

export const commands = {
  composerUpdate,
  yarnUpgrade,
  bowerUpdate
}

export const cmds = Object.keys(commands)
