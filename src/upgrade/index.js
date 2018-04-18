import * as composer from './composer'
import * as yarn from './yarn'

export const commands = {
  composer,
  yarn
}

export const cmds = Object.keys(commands)

export const name = 'upgrade'

export const description = 'upgrade flynt dependencies (composer, yarn)'
