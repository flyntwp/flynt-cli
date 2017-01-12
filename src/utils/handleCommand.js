import _ from 'lodash'
import Promise from 'bluebird'
import inquirer from 'inquirer'
import getRootPath from './getRootPath'

import {getConfig, saveConfig, mapConfigToAnswers} from './config'

export default function handleCommand (commandObject, fromEnv, toEnv, subCommand, skipRootExecution) {
  return function (argv) {
    if (!skipRootExecution && !argv.force) {
      const rootPath = getRootPath()
      process.chdir(rootPath)
    }
    // return if subcommand was called but handler was registered to main command
    // in this case yarg first calls the handler for the subcommand and afterwards
    // for main.
    // however, this handler should only be executed once
    if (!subCommand && argv._.length !== 1) {
      return Promise.resolve()
    }
    fromEnv = resolveEnv(fromEnv, argv)
    toEnv = resolveEnv(toEnv, argv)

    const config = getConfig(argv)
    const commandsToRun = filterValidCommands(commandObject.commands, subCommand)
    const answersFromConfig = mapConfigToAnswers(config, fromEnv, toEnv)

    Promise.resolve(commandsToRun)
    .tap(checkRequirements)
    .then(promptMissingConfig(answersFromConfig))
    .tap(runCommands(commandsToRun), err => console.log(err))
    // TODO: save config before runCommands but make sure to save in right folder
    // relevant for setup command if installBedrock is called because of chdir
    .tap(saveConfig(argv, config, fromEnv, toEnv))
  }
}

function resolveEnv (env, argv) {
  if (env && env.indexOf('argv.') === 0) {
    return argv[env.replace('argv.', '')]
  } else {
    return env
  }
}

function filterValidCommands (commands, subCommands) {
  if (!subCommands) {
    return commands
  } else {
    subCommands = [].concat(subCommands)
    return _.pickBy(commands, (cmd, name) => _.includes(subCommands, name))
  }
}

function checkRequirements (commands) {
  let requirements = _.map(_.values(commands), 'requirements')
  requirements = _.union(...requirements)
  return Promise.all(requirements.map(fn => fn()))
}

function promptMissingConfig (answersFromConfig) {
  return function (commands) {
    let prompts = _.map(_.values(commands), 'prompts')
    prompts = _.union(...prompts)
    .filter(prompt => !_.has(answersFromConfig, prompt.name))
    return inquirer.prompt(prompts)
    .then(answers => _.merge({}, answersFromConfig, answers))
  }
}

function runCommands (commands) {
  const runs = _.map(_.values(commands), 'run')
  return function (answers) {
    let allRuns = Promise.resolve()
    runs.forEach(function (fn) {
      allRuns = allRuns.then(() => fn(answers))
    })
    return allRuns
  }
}
