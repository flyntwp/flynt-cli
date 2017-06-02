import _ from 'lodash'
import streamFilter from 'through2-filter'
import stripAnsi from 'strip-ansi'

import exec from '../utils/executeCommand'
import log, {is as logIs} from '../utils/log'

import * as allPrompts from '../prompts'
import * as allRequirements from '../requirements'

export const description = 'run yarn start for flynt theme'

export const runMessage = 'Watching files...'

export const requirements = [
  allRequirements.yarn,
  allRequirements.gulp
]

export const prompts = [
  allPrompts.themeName
]

export function run (answers) {
  const themePath = `web/app/themes/${answers.themeName}`
  let cmds = [
    `cd ${themePath}`,
    'yarn start'
  ]
  if (logIs('DEBUG')) {
    return exec(cmds)
  } else {
    return exec(cmds, notify)
  }
}

function notify (stdout, stderr) {
  let activated = false
  const onBrowserSync = streamFilter({wantStrings: true}, function (chunk) {
    const strippedChunk = stripAnsi(chunk)
    if (_.startsWith(strippedChunk, '[BS]')) {
      process.stdout.clearLine()
      process.stdout.cursorTo(0)
      activated = true
    } else if (activated && _.startsWith(strippedChunk, '[')) {
      activated = false
    }
    return activated
  })
  stdout.pipe(onBrowserSync).pipe(process.stdout)
}
