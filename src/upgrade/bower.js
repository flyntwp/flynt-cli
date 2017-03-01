import path from 'path'
import fs from 'fs'
import exec from '../utils/executeCommand'

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
    console.log(`Skipping bower update. No bower.json found in ${themePath}`)
  }
}
