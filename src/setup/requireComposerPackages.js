import childProcess from 'child_process'
import Promise from 'bluebird'

import * as allRequirements from '../requirements'

export const requirements = [
  allRequirements.composer
]

export const prompts = [
]

export function run (answers) {
  let cmds = [
    'composer config repositories.flyntCore git "git@github.com:bleech/wp-starter-plugin.git"',
    'composer config repositories.acfFieldGroupComposer git "git@github.com:bleech/acf-field-group-composer.git"',
    'composer require "timber/timber:~1.1" flyntwp/flynt-core:dev-master flyntwp/acf-field-group-composer:dev-master'
  ]
  return new Promise(function (resolve, reject) {
    let exec = childProcess.exec(cmds.join(' && '), function () {
      resolve()
    })
    exec.stdout.pipe(process.stdout)
    exec.stderr.pipe(process.stderr)
  })
}
