import path from 'path'
import fs from 'fs'
import Promise from 'bluebird'
import exec from '../utils/executeCommand'
import {SubcommandSkip} from '../utils/Errors'

import * as allPrompts from '../prompts'

export const description = 'upgrade theme dependencies with bower'

export const requirements = [
]

export const prompts = [
  allPrompts.themeName
]

export function run (answers) {
  const themePath = `web/app/themes/${answers.themeName}`
  if (fs.existsSync(path.join(process.cwd(), themePath, 'bower.json'))) {
    const cmds = [
      `cd ${themePath}`,
      'bower update'
    ]
    return exec(cmds)
  } else {
    return Promise.reject(new SubcommandSkip('bower', `Skipping bower update. No bower.json found in ${themePath}`))
  }
}
