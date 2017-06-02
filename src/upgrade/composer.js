import exec from '../utils/executeCommand'

import * as allRequirements from '../requirements'

export const description = 'upgrade project dependencies with composer'

export const runMessage = 'Upgrading PHP composer dependencies...'

export const requirements = [
  allRequirements.composer
]

export const prompts = [
]

export function run (answers) {
  const cmds = [
    'composer update'
  ]
  return exec(cmds)
}
