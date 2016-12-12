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
