import exec from './executeCommand'

export default function (command, path = null) {
  const commandIndex = process.argv.indexOf(command)
  const argvLength = process.argv.length

  const cmd = process.argv.slice(commandIndex, argvLength)

  const cmds = [cmd.join(' ')]

  if (path) {
    cmds.unshift(`cd ${path}`)
  }

  return exec(cmds)
}
