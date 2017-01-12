import exec from '../utils/executeCommand'

import * as allPrompts from '../prompts'
import * as allRequirements from '../requirements'

export const requirements = [
  allRequirements.yarn
]

export const prompts = [
  allPrompts.projectName
]

export function run (answers) {
  const themePath = `web/app/themes/${answers.projectName}`
  let cmds = [
    `cd ${themePath}`,
    'yarn'
  ]
  return exec(cmds)
}
