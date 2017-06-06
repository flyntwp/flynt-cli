import exec from '../utils/executeCommand'

import * as allRequirements from '../requirements'

export const description = 'install project dependencies with composer'

export const runMessage = 'Installing PHP composer dependencies...'

export const requirements = [
  allRequirements.composer
]

export const prompts = [
]

export function run (answers) {
  const cmds = [
    'composer install'
  ]
  return exec(cmds)
}
