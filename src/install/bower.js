import path from 'path'
import fs from 'fs'
import Promise from 'bluebird'
import exec from '../utils/executeCommand'
import {SubcommandSkip} from '../utils/Errors'

import * as allPrompts from '../prompts'

export const description = 'install theme dependencies with bower'

export const runMessage = 'Installing bower dependencies...'

export const requirements = [
]

export const prompts = [
  allPrompts.themeName
]

export function run (answers) {
  const themePath = `web/app/themes/${answers.themeName}`
  if (fs.existsSync(path.join(process.cwd(), themePath, 'bower.json'))) {
    let cmds = [
      `cd ${themePath}`,
      'bower install'
    ]
    return exec(cmds)
  } else {
    return Promise.reject(new SubcommandSkip('bower', `Skipping bower install. No bower.json found in ${themePath}`))
  }
}
