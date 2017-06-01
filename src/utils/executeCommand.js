import childProcess from 'child_process'
import Promise from 'bluebird'
import * as log from './log'
import {SubcommandError} from './Errors'
import _ from 'lodash'

export default function (cmds, notify) {
  return new Promise(function (resolve, reject) {
    let spawn
    let options = {
      stdio: 'pipe',
      env: _.assign({}, process.env, {
        'FORCE_COLOR': true,
        'SHELL_PIPE': false
      })
    }

    if (log.is('DEBUG')) {
      console.log('')
    }

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
      if (log.is('DEBUG')) {
        log.default('')
      }
      if (code === 0) {
        resolve()
      } else {
        reject(new SubcommandError())
      }
    })

    if (log.is('DEBUG')) {
      spawn.stdout.pipe(process.stdout)
      spawn.stdin.pipe(process.stdin)
      spawn.stderr.pipe(process.stderr)
    }

    if (_.isFunction(notify)) {
      notify(spawn.stdout, spawn.stderr)
    }
  })
}
