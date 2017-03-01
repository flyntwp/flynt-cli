import * as deployDefault from './default'

export const commands = {
  default: deployDefault
}

export const cmds = Object.keys(commands)

export const description = 'deploy source code from local to any environment'

export const options = {
  to: {
    describe: 'Environment to clone to',
    type: 'string',
    default: 'development'
  },
  n: {
    alias: 'dry-run',
    describe: 'Perform trial run',
    type: 'boolean'
  }
}
