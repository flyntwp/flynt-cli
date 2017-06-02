import path from 'path'
import fs from 'fs'
import exec from '../utils/executeCommand'

import * as allPrompts from '../prompts'
import * as allRequirements from '../requirements'

import phpDependencies from '../utils/phpDependencies'

export const description = 'composer create-project with roots/bedrock'

export const runMessage = 'Installing Bedrock...'

export const requirements = [
  allRequirements.composer
]

export const prompts = [
  allPrompts.projectName
]

export function run (answers) {
  const installInPlace = currentDirIsProjectDir(answers.projectName)
  if (installInPlace) {
    const cmds = [
      'rm .flynt.json',
      `composer create-project "roots/bedrock=${phpDependencies['roots/bedrock']}" .`
    ]
    return exec(cmds)
  } else {
    const cmds = [
      `composer create-project "roots/bedrock=${phpDependencies['roots/bedrock']}" ${answers.projectName}`
    ]
    return exec(cmds).then(function () {
      process.chdir(answers.projectName)
    })
  }
}

function currentDirIsProjectDir (projectName) {
  const cwd = process.cwd()
  const currentPathBasename = path.basename(cwd)

  if (currentPathBasename === projectName) {
    const files = fs.readdirSync(cwd)
    if (!files.length || (files.length === 1 && files[0] === '.flynt.json')) {
      return true
    }
  }

  return false
}

export const notInRootFolder = true
