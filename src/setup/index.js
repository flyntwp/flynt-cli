import * as installBedrock from './installBedrock'
import * as requireComposerPackages from './requireComposerPackages'
import * as setupTheme from './setupTheme'
import * as initGitRepo from './initGitRepo'
import * as createDb from './createDb'
import * as setupWordpress from './setupWordpress'
import * as activateWordpress from './activateWordpress'

export const commands = {
  installBedrock,
  requireComposerPackages,
  setupTheme,
  initGitRepo,
  createDb,
  setupWordpress,
  activateWordpress
}

export const cmds = Object.keys(commands)
