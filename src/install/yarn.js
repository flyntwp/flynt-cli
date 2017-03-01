import exec from '../utils/executeCommand'

import * as allPrompts from '../prompts'
import * as allRequirements from '../requirements'

export const description = 'install theme dependencies with yarn'

export const requirements = [
  allRequirements.yarn
]

export const prompts = [
  allPrompts.themeName
]

export function run (answers) {
  const themePath = `web/app/themes/${answers.themeName}`
  let cmds = [
    `cd ${themePath}`,
    'yarn'
  ]
  return exec(cmds)
}
