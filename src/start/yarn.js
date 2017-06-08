import _ from 'lodash'
import streamFilter from 'through2-filter'
import stripAnsi from 'strip-ansi'

import exec from '../utils/executeCommand'
import {is as logIs} from '../utils/log'

import * as allPrompts from '../prompts'
import * as allRequirements from '../requirements'

export const description = 'run yarn start for flynt theme'

export const runMessage = 'Starting development environment...'
const runMessageWatching = 'Watching files...'

export const requirements = [
  allRequirements.yarn,
  allRequirements.gulp
]

export const prompts = [
  allPrompts.themeName
]

export function run (answers, arv, spinner) {
  const themePath = `web/app/themes/${answers.themeName}`
  let cmds = [
    `cd ${themePath}`,
    'yarn start'
  ]
  if (logIs('DEBUG')) {
    return exec(cmds)
  } else {
    return exec(cmds, notify(spinner))
  }
}

function notify (spinner) {
  return function (stdout, stderr) {
    const onBrowserSync = streamFilter({wantStrings: true}, function (chunk) {
      const ignoredLines = [
        "Finished '",
        "Starting '",
        '$ check-node-version',
        'node:',
        'npm:',
        'yarn:',
        'yarn start',
        'Using gulpfile',
        '[webpack:build] Completed',
        '[emitted]'
      ]
      const strippedChunk = stripAnsi(chunk)
      let activated
      if (_.includes(strippedChunk, "Finished 'default'")) {
        spinner.text = runMessageWatching
      }
      if (_.some(ignoredLines, ignoredLine => _.includes(strippedChunk, ignoredLine))) {
        activated = false
      } else {
        process.stdout.clearLine()
        process.stdout.cursorTo(0)
        activated = true
      }
      return activated
    })
    stdout.pipe(onBrowserSync).pipe(process.stdout)
  }
}
