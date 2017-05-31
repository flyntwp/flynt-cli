import childProcess from 'child_process'
import Promise from 'bluebird'
import * as log from './log'
import {SubcommandError} from './Errors'

export default function (cmds) {
  return new Promise(function (resolve, reject) {
    let spawn
    let options = {}

    if (log.is('DEBUG')) {
      options['stdio'] = 'inherit'
      console.log('')
    } else {
      options['stdio'] = 'ignore'
    }

    options['stdio'] = log.is('DEBUG') ? 'inherit' : 'ignore'

    const isWin = process.platform === 'win32'
    if (isWin) {
      options['windowsVerbatimArguments'] = true
      spawn = childProcess.spawn(
        'cmd.exe',
        ['/s', '/c', '"' + cmds.join(' && ') + '"'],
        options
      )
    } else {
      spawn = childProcess.spawn('/bin/sh', ['-c', cmds.join(' && ')], options)
    }

    spawn.on('exit', function (code) {
      if (code === 0) {
        resolve()
      } else {
        reject(new SubcommandError())
      }
    })
  })
}
