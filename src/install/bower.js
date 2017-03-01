import path from 'path'
import fs from 'fs'
import exec from '../utils/executeCommand'

import * as allPrompts from '../prompts'

export const description = 'install theme dependencies with bower'

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
    console.log(`Skipping bower install. No bower.json found in ${themePath}`)
  }
}
