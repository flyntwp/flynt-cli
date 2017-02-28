import * as installBedrock from './installBedrock'
import * as adjustGitignore from './adjustGitignore'
import * as requireComposerPackages from './requireComposerPackages'
import * as setupTheme from './setupTheme'
import * as replaceProjectSpecificStrings from './replaceProjectSpecificStrings'
import * as initGitRepo from './initGitRepo'
import * as createDb from './createDb'
import * as setupWordpress from './setupWordpress'
import * as yarnBuild from '../build/yarnBuild'
import * as activateWordpress from './activateWordpress'

export const commands = {
  installBedrock,
  adjustGitignore,
  requireComposerPackages,
  setupTheme,
  replaceProjectSpecificStrings,
  createDb,
  setupWordpress,
  yarnBuild,
  activateWordpress,
  initGitRepo
}

export const cmds = Object.keys(commands)
