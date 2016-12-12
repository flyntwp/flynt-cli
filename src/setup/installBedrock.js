import childProcess from 'child_process'
import Promise from 'bluebird'

import * as allPrompts from '../prompts'
import * as allRequirements from '../requirements'

export const requirements = [
  allRequirements.composer
]

export const prompts = [
  allPrompts.projectName
]

export function run (answers) {
  let cmds = [
    `composer create-project roots/bedrock ${answers.projectName}`
  ]
  return new Promise(function (resolve, reject) {
    let exec = childProcess.exec(cmds.join(' && '), function () {
      process.chdir(answers.projectName)
      resolve()
    })
    exec.stdout.pipe(process.stdout)
    exec.stderr.pipe(process.stderr)
  })
}
