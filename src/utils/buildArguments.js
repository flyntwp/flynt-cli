import _ from 'lodash'

import handleCommand from './handleCommand'

export default function buildArguments (commandObject, fromEnv, toEnv, options = {}) {
  return function (yargs) {
    yargs.usage(`Usage: $0 ${commandObject.name} [<subcommand>] [options]`)
    Object.keys(options).forEach(function (optionKey) {
      options[optionKey].group = 'Command Specific Option:'
    })
    commandObject.cmds.forEach(function (cmd) {
      const cmdObject = commandObject.commands[cmd]
      yargs = yargs.command(cmd, cmdObject.description, options, handleCommand(commandObject, fromEnv, toEnv, cmd))
    })
    _.forIn(options, function (value, key) {
      yargs.option(key, value)
    })
    return yargs
  }
}
