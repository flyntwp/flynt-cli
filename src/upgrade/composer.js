import exec from '../utils/executeCommand'

import * as allRequirements from '../requirements'

export const description = 'upgrade project dependencies with composer'

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
