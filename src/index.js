#!/usr/bin/env node
import yargs from 'yargs'
import inquirer from 'inquirer'
import Promise from 'bluebird'
import _ from 'lodash'

import * as installBedrock from './setup/installBedrock'
import * as requireComposerPackages from './setup/requireComposerPackages'
import * as setupTheme from './setup/setupTheme'
import * as createDb from './setup/createDb'
import * as setupWordpress from './setup/setupWordpress'
import * as activateWordpress from './setup/activateWordpress'

// import {builder} from './cmds/setup'

// yargs
// .commandDir('cmds')
// // .demand(1)
// .help()
// .argv

const requirements = [
  // installBedrock,
  // requireComposerPackages,
  // setupTheme,
  // createDb,
  // setupWordpress,
  activateWordpress,
].map(task => task.requirements)

const prompts = [
  // installBedrock,
  // requireComposerPackages,
  // setupTheme,
  // createDb,
  // setupWordpress,
  activateWordpress,
].map(task => task.prompts)

const runs = [
  // installBedrock,
  // requireComposerPackages,
  // setupTheme,
  // createDb,
  // setupWordpress,
  activateWordpress,
].map(task => task.run)

Promise.all(_.union(...requirements).map(fn => fn()))
.then(function () {
  inquirer.prompt(_.union(...prompts))
  .then(function (answers) {
    console.log(answers)
    console.log(runs)
    let allRuns = Promise.resolve()
    runs.forEach(fn => allRuns = allRuns.then(() => fn(answers)))
    // Promise.all(runs.map(fn => fn(answers)))
  })
}, function (err) {
  console.log(err);
})
