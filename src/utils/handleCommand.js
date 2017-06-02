import _ from 'lodash'
import Promise from 'bluebird'
import inquirer from 'inquirer'
import ora from 'ora'
import getRootPath from './getRootPath'
import {SubcommandSkip, SubcommandError} from './Errors'
import log, {setLevel as setLogLevel, is as logIs} from './log'
import * as notifier from './notifier'

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

    if (argv.verbose) {
      setLogLevel('DEBUG')
    }

    const validCommandsValues = filterValidCommands(commandObject.commands, subCommand)
    const commandsToRun = _.map(validCommandsValues)

    switchToRoot(_.values(validCommandsValues)[0].notInRootFolder || argv.force)
    .then(function () {
      const config = getConfig(argv)
      const answersFromConfig = mapConfigToAnswers(config, fromEnv, toEnv)

      const whenToSaveConfigIndex = getWhenToSaveConfigIndex(validCommandsValues)
      commandsToRun.splice(whenToSaveConfigIndex, 0, {
        run: saveConfig(argv, config, fromEnv, toEnv),
        name: 'saveConfig'
      })

      Promise.resolve(validCommandsValues)
      .tap(checkRequirements)
      .then(promptMissingConfig(answersFromConfig, fromEnv, toEnv))
      .tap(runCommands(commandsToRun, argv, commandObject), err => console.log(err))
      .tap(notify)
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
  let validCommands
  if (!subCommands) {
    validCommands = commands
  } else {
    subCommands = [].concat(subCommands)
    validCommands = _.pickBy(commands, (cmd, name) => _.includes(subCommands, name))
  }
  return _.map(validCommands, (command, name) => _.assign({}, command, {name: name}))
}

function checkRequirements (commands) {
  let requirements = _.map(_.values(commands), 'requirements')
  requirements = _.union(...requirements)
  return Promise.all(requirements.map(fn => fn()))
}

function promptMissingConfig (answersFromConfig, fromEnv, toEnv) {
  return function (commands) {
    let prompts = _.map(_.values(commands), 'prompts')
    prompts = _.union(...prompts)
    .map(function (prompt) {
      if (_.isFunction(prompt)) {
        return prompt(fromEnv, toEnv)
      }
      return prompt
    })
    .filter(prompt => !_.has(answersFromConfig, prompt.name))
    return inquirer.prompt(prompts)
    .then(answers => _.merge({}, answersFromConfig, answers))
  }
}

function runCommands (commands, argv, commandObject) {
  return function (answers) {
    let allRuns = Promise.resolve()
    commands.forEach(function (command, commandIndex) {
      allRuns = allRuns.then(function () {
        const spinner = ora(`Command ${commandObject.name}:${command.name}`).start()
        if (command.message || logIs('DEBUG')) {
          spinner.stopAndPersist({symbol: '▶'})
        }
        if (command.message && !logIs('DEBUG')) {
          spinner.text = command.message
          spinner.start()
        }
        return Promise.resolve(command.run(answers, argv))
        .then(
          () => { spinner.succeed() },
          (e) => {
            if (e instanceof SubcommandSkip) {
              spinner.info()
              log(e.message)
            } else {
              spinner.fail()
              if (e instanceof SubcommandError) {
                e.failedCommand = commandIndex
              }
              throw e
            }
          }
        )
      })
    })
    return allRuns
    .catch((e) => {
      if (e instanceof SubcommandError) {
        log('Execution failed. The following commands were not executed:')
        const missingCommands = _.map(commands.slice(e.failedCommand, commands.length), 'name')
        missingCommands.forEach((command) => log(`\tflynt ${commandObject.name} ${command}`))
        log('Do not forget to add the flags used to run the current command.')
        if (!logIs('DEBUG')) {
          log('Run with `-v` flag to get more info.')
        }
      } else {
        throw e
      }
    })
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

function notify () {
  notifier.echo()
}
