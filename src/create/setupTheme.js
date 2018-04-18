import exec from '../utils/executeCommand'

import * as allPrompts from '../prompts'
import * as allRequirements from '../requirements'

export const description = 'setup new theme from flynt-theme repo'

export const runMessage = 'Setting up new theme...'

export const requirements = [
  allRequirements.git,
  allRequirements.yarn
]

export const prompts = [
  allPrompts.themeName
]

export function run (answers) {
  const themePath = `web/app/themes/${answers.themeName}`
  let cmds = [
    `git clone --depth=1 "https://github.com/flyntwp/flynt-starter-theme.git" ${themePath}`,
    `ln -nfs ${themePath} theme`,
    `cd ${themePath}`,
    'rm -rf .git'
  ]
  return exec(cmds)
}
