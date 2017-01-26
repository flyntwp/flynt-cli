import childProcess from 'child_process'
import Promise from 'bluebird'

export default function (cmds) {
  return new Promise(function (resolve, reject) {
    let spawn

    const isWin = process.platform === 'win32'
    if (isWin) {
      spawn = childProcess.spawn(
        'cmd.exe',
        ['/s', '/c', '"' + cmds.join(' && ') + '"'],
        { windowsVerbatimArguments: true, stdio: 'inherit' }
      )
    } else {
      spawn = childProcess.spawn('/bin/sh', ['-c', cmds.join(' && ')], {stdio: 'inherit'})
    }

    spawn.on('exit', function () {
      resolve()
    })
  })
}
