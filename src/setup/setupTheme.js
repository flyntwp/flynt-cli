import childProcess from 'child_process'
import Promise from 'bluebird'

import * as allPrompts from '../prompts'
import * as allRequirements from '../requirements'

export const requirements = [
  allRequirements.git,
  allRequirements.yarn,
]

export const prompts = [
  allPrompts.projectName
]

export function run (answers) {
  const themePath = `web/app/themes/${answers.projectName}`
  let cmds = [
    `git clone --depth=1 "git@github.com:bleech/wp-starter-theme.git" ${themePath}`,
    `cd ${themePath}`,
    'rm -rf .git',
    'yarn',
  ]
  return new Promise(function (resolve, reject) {
    let exec = childProcess.exec(cmds.join(' && '), function () {
      resolve()
    })
    exec.stdout.pipe(process.stdout)
    exec.stderr.pipe(process.stderr)
  })
}
