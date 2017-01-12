import exec from '../utils/executeCommand'

import * as allPrompts from '../prompts'
import * as allRequirements from '../requirements'

export const requirements = [
  allRequirements.git,
  allRequirements.yarn
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
    'yarn'
  ]
  return exec(cmds)
}
