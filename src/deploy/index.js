import * as deployDefault from './default'

export const commands = {
  default: deployDefault
}

export const cmds = Object.keys(commands)

export const name = 'deploy'

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

export const srcEnv = 'local'

export const destEnv = 'argv.to'
