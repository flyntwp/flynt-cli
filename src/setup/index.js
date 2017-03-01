import * as installComposer from '../install/composer'
import * as installYarn from '../install/yarn'
import * as installBower from '../install/bower'
import * as createDb from '../create/db'

export const commands = {
  installComposer,
  installYarn,
  installBower,
  createDb
}

export const cmds = Object.keys(commands)

export const description = 'setup an existing flynt project'
