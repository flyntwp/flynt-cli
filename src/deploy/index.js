import * as deployDefault from './default'

export const commands = {
  default: deployDefault
}

export const cmds = Object.keys(commands)

export const description = 'deploy source code from local to any environment'
