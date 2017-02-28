import * as composer from './composer'
import * as yarn from './yarn'
import * as bower from './bower'

export const commands = {
  composer,
  yarn,
  bower
}

export const cmds = Object.keys(commands)
