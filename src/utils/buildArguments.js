import handleCommand from './handleCommand'

export default function buildArguments (commandObject, fromEnv, toEnv) {
  return function (yargs) {
    commandObject.cmds.forEach(function (cmd) {
      yargs = yargs.command(cmd, '', {}, handleCommand(commandObject, fromEnv, toEnv, cmd))
    })
    return yargs
  }
}
