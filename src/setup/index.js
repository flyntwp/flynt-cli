import inquirer from 'inquirer'
import Promise from 'bluebird'
import _ from 'lodash'

import * as installBedrock from './installBedrock'
import * as requireComposerPackages from './requireComposerPackages'
import * as setupTheme from './setupTheme'
import * as initGitRepo from './initGitRepo'
import * as createDb from './createDb'
import * as setupWordpress from './setupWordpress'
import * as activateWordpress from './activateWordpress'

const cmdsObject = {
  installBedrock,
  requireComposerPackages,
  setupTheme,
  initGitRepo,
  createDb,
  setupWordpress,
  activateWordpress,
}

export const cmds = Object.keys(cmdsObject)

export function run (step) {
  let steps = (!step) ? cmds : [].concat(step)
  steps = steps.filter(step => !!cmdsObject[step])
  const requirements = steps.map(step => cmdsObject[step].requirements)
  const prompts = steps.map(step => cmdsObject[step].prompts)
  const runs = steps.map(step => cmdsObject[step].run)

  return Promise.all(_.union(...requirements).map(fn => fn()))
  .then(function () {
    inquirer.prompt(_.union(...prompts))
    .then(function (answers) {
      let allRuns = Promise.resolve()
      runs.forEach(fn => allRuns = allRuns.then(() => fn(answers)))
      return allRuns
    })
  }, function (err) {
    console.log(err);
  })
}
