import exec from '../utils/exec'

import * as allRequirements from '../requirements'

export const requirements = [
  allRequirements.composer
]

export const prompts = [
]

export function run (answers) {
  let cmds = [
    `composer create-project roots/bedrock .`
  ]
  return exec(cmds)
}
