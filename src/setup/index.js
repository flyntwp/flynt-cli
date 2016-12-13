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
  activateWordpress
}

export const cmds = Object.keys(cmdsObject)

export function run (step, config) {
  let steps = (!step) ? cmds : [].concat(step)
  steps = steps.filter(step => !!cmdsObject[step])
  let requirements = steps.map(step => cmdsObject[step].requirements)
  requirements = _.union(...requirements)
  let prompts = steps.map(step => cmdsObject[step].prompts)
  prompts = _.union(...prompts)
  .filter(prompt => !_.has(config, prompt.name))
  const runs = steps.map(step => cmdsObject[step].run)

  return Promise.all(requirements.map(fn => fn()))
  .then(() => inquirer.prompt(prompts))
  .then(function (answers) {
    config = _.merge({}, config, answers)
    let allRuns = Promise.resolve()
    runs.forEach(function (fn) {
      allRuns = allRuns.then(() => fn(config))
    })
    return allRuns
  }, function (err) {
    console.log(err)
  })
  .then(() => config)
}
