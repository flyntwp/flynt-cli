import * as composer from './composer'
import * as yarn from './yarn'

export const commands = {
  composer,
  yarn
}

export const cmds = Object.keys(commands)

export const name = 'install'

export const description = 'install flynt dependencies (composer, yarn)'
