import Promise from 'bluebird'
import hasbin from 'hasbin'
import childProcess from 'child_process'

function checkForBinary (cmd) {
  return new Promise(function (resolve, reject) {
    hasbin(cmd, function (exists) {
      if (exists) {
        resolve()
      } else {
        reject(`Please have '${cmd}' available in your PATH.`)
      }
    })
  })
}

export function composer () {
  return checkForBinary('composer')
}

export function wpCli () {
  return checkForBinary('wp')
}

export function wpCliDotenv () {
  return new Promise(function (resolve, reject) {
    childProcess.exec('wp dotenv', function (err, stdout, stderr) {
      if (err) {
        reject(`Please run 'wp package install aaemnnosttv/wp-cli-dotenv-command'`)
      } else {
        resolve()
      }
    })
  })
}

export function git () {
  return checkForBinary('git')
}

export function yarn () {
  return checkForBinary('yarn')
}

export function mysql () {
  return checkForBinary('mysql')
}

export function mysqldump () {
  return checkForBinary('mysqldump')
}

export function php () {
  return checkForBinary('php')
}

export function ssh () {
  return checkForBinary('ssh')
}

export function scp () {
  return checkForBinary('scp')
}

export function sed () {
  return checkForBinary('sed')
}

export function rsync () {
  return checkForBinary('rsync')
}
