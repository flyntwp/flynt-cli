import _ from 'lodash'
import Promise from 'bluebird'
import inquirer from 'inquirer'
import getRootPath from './getRootPath'

import {getConfig, saveConfig, mapConfigToAnswers} from './config'

export default function handleCommand (commandObject, fromEnv, toEnv, subCommand) {
  return function (argv) {
    // return if subcommand was called but handler was registered to main command
    // in this case yarg first calls the handler for the subcommand and afterwards
    // for main.
    // however, this handler should only be executed once
    if (!subCommand && argv._.length !== 1) {
      return Promise.resolve()
    }
    fromEnv = resolveEnv(fromEnv, argv)
    toEnv = resolveEnv(toEnv, argv)

    const validCommands = filterValidCommands(commandObject.commands, subCommand)
    const validCommandsValues = _.values(validCommands)
    const commandsToRun = _.map(validCommandsValues, 'run')

    switchToRoot(validCommandsValues[0].notInRootFolder || argv.force)
    .then(function () {
      const config = getConfig(argv)
      const answersFromConfig = mapConfigToAnswers(config, fromEnv, toEnv)

      const whenToSaveConfigIndex = getWhenToSaveConfigIndex(validCommandsValues)
      commandsToRun.splice(whenToSaveConfigIndex, 0, saveConfig(argv, config, fromEnv, toEnv))

      Promise.resolve(validCommandsValues)
      .tap(checkRequirements)
      .then(promptMissingConfig(answersFromConfig))
      .tap(runCommands(commandsToRun), err => console.log(err))
    })
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
  return function (answers) {
    let allRuns = Promise.resolve()
    commands.forEach(function (command) {
      allRuns = allRuns.then(() => command(answers))
    })
    return allRuns
  }
}

function switchToRoot (force) {
  if (!force) {
    const rootPath = getRootPath()
    if (rootPath !== process.cwd()) {
      return inquirer.prompt([{
        type: 'confirm',
        name: 'switchToRoot',
        message: `Do you want to switch to ${rootPath} to execute the command?`,
        default: true
      }]).then(function (answers) {
        if (answers.switchToRoot) process.chdir(rootPath)
      })
    }
  }
  return Promise.resolve()
}

function getWhenToSaveConfigIndex (commands) {
  for (const index in commands) {
    const command = commands[index]
    if (!command.notInRootFolder) {
      return index
    }
  }
  return commands.length
}
