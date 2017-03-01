import exec from '../utils/executeCommand'

import * as allPrompts from '../prompts'
import * as allRequirements from '../requirements'

export const description = 'run yarn build for flynt theme'

export const requirements = [
  allRequirements.yarn,
  allRequirements.gulp
]

export const prompts = [
  allPrompts.themeName
]

export function run (answers) {
  const themePath = `web/app/themes/${answers.themeName}`
  let cmds = [
    `cd ${themePath}`,
    'yarn build'
  ]
  return exec(cmds)
}
