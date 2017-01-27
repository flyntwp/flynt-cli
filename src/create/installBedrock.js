import exec from '../utils/executeCommand'

import * as allPrompts from '../prompts'
import * as allRequirements from '../requirements'

import phpDependencies from '../utils/phpDependencies'

export const requirements = [
  allRequirements.composer
]

export const prompts = [
  allPrompts.projectName
]

export function run (answers) {
  let cmds = [
    `composer create-project "roots/bedrock=${phpDependencies['roots/bedrock']}" ${answers.projectName}`
  ]
  return exec(cmds).then(function () {
    process.chdir(answers.projectName)
  })
}
