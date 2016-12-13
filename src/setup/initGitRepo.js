import childProcess from 'child_process'
import Promise from 'bluebird'

import * as allPrompts from '../prompts'
import * as allRequirements from '../requirements'

export const requirements = [
  allRequirements.git
]

export const prompts = [
  allPrompts.gitRepo
]

export function run (answers) {
  let cmds = [
    'git init',
    'git add .',
    'git commit -m "chore(setup): initial commit"'
  ]
  if (answers.gitRepo) {
    cmds = cmds.concat([
      `git remote add origin ${answers.gitRepo}`,
      'git push -u origin master'
    ])
  }
  return new Promise(function (resolve, reject) {
    let exec = childProcess.exec(cmds.join(' && '), function () {
      resolve()
    })
    exec.stdout.pipe(process.stdout)
    exec.stderr.pipe(process.stderr)
  })
}
