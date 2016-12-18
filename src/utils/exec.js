import childProcess from 'child_process'
import Promise from 'bluebird'

export default function (cmds) {
  return new Promise(function (resolve, reject) {
    let exec = childProcess.exec(cmds.join(' && '), function () {
      resolve()
    })
    exec.stdout.pipe(process.stdout)
    exec.stderr.pipe(process.stderr)
  })
}
