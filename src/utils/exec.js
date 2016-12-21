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
        { windowsVerbatimArguments: true, stdio: [process.stdin, 'pipe', 'pipe'] }
      )
    } else {
      spawn = childProcess.spawn('/bin/sh', ['-c', cmds.join(' && ')])
    }

    spawn.stdout.pipe(process.stdout)
    spawn.stderr.pipe(process.stderr)
    spawn.on('exit', function () {
      resolve()
    })
  })
}
