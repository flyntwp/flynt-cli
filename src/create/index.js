import * as installBedrock from './installBedrock'
import * as adjustGitignore from './adjustGitignore'
import * as requireComposerPackages from './requireComposerPackages'
import * as setupTheme from './setupTheme'
import * as replaceProjectSpecificStrings from './replaceProjectSpecificStrings'
import * as initGitRepo from './initGitRepo'
import * as db from './db'
import * as setupWordpress from './setupWordpress'
import * as installYarn from '../install/yarn'
import * as installBower from '../install/bower'
import * as buildYarn from '../build/yarn'
import * as activateWordpress from './activateWordpress'
import * as removeDotEnv from './removeDotEnv'

export const commands = {
  installBedrock,
  adjustGitignore,
  requireComposerPackages,
  setupTheme,
  replaceProjectSpecificStrings,
  db,
  installYarn,
  installBower,
  buildYarn,
  removeDotEnv,
  setupWordpress,
  activateWordpress,
  initGitRepo
}

export const cmds = Object.keys(commands)

export const name = 'create'

export const description = 'create a new flynt project'
