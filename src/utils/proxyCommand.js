import exec from './executeCommand'
import {setLevel as setLogLevel} from './log'

export default function (command, path = null) {
  return function (argv) {
    if (argv.verbose) {
      setLogLevel('DEBUG')
    }
    const commandIndex = process.argv.indexOf(command)
    const argvLength = process.argv.length

    const cmd = process.argv.slice(commandIndex, argvLength)

    const cmds = [cmd.join(' ')]

    if (path) {
      cmds.unshift(`cd ${path}`)
    }

    return exec(cmds)
  }
}
