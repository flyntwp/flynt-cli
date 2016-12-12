import Promise from 'bluebird'
import hasbin from 'hasbin'

export function composer () {
  return new Promise(function (resolve, reject) {
    hasbin('composer', function (exists) {
      if (exists) {
        resolve()
      } else {
        reject("Please have 'composer' available in your PATH.")
      }
    })
  })
}

export function wpCli () {
  return new Promise(function (resolve, reject) {
    hasbin('wp', function (exists) {
      if (exists) {
        resolve()
      } else {
        reject("Please have 'wp' available in your PATH.")
      }
    })
  })
}

export function git () {
  return new Promise(function (resolve, reject) {
    hasbin('git', function (exists) {
      if (exists) {
        resolve()
      } else {
        reject("Please have 'git' available in your PATH.")
      }
    })
  })
}

export function yarn () {
  return new Promise(function (resolve, reject) {
    hasbin('yarn', function (exists) {
      if (exists) {
        resolve()
      } else {
        reject("Please have 'yarn' available in your PATH.")
      }
    })
  })
}

export function mysql () {
  return new Promise(function (resolve, reject) {
    hasbin('mysql', function (exists) {
      if (exists) {
        resolve()
      } else {
        reject("Please have 'mysql' available in your PATH.")
      }
    })
  })
}
