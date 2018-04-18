import * as installComposer from '../install/composer'
import * as installYarn from '../install/yarn'
import * as createDb from '../create/db'

export const commands = {
  installComposer,
  installYarn,
  createDb
}

export const cmds = Object.keys(commands)

export const name = 'setup'

export const description = 'setup an existing flynt project'
