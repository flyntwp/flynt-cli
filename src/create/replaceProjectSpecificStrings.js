import replace from 'replace-in-file'
import Promise from 'bluebird'

import * as allPrompts from '../prompts'

export const requirements = [
]

export const prompts = [
  allPrompts.projectName,
  allPrompts.wpHome
]

export function run (answers) {
  const replacements = getReplacements(answers)
  return Promise.all(Object.keys(replacements).map(function (file) {
    const searchFor = Object.keys(replacements[file])
    const replaceWith = searchFor.map((sf) => replacements[file][sf])
    return replace({
      files: file,
      replace: searchFor,
      with: replaceWith
    })
  }))
}

function getReplacements (answers) {
  return {
    [`web/app/themes/${answers.projectName}/gulpfile.js/config.js`]: {
      "const host = 'flynt.dev'": `const host = '${answers.wpHome}'`,
      "sourceRoot: '/app/themes/flynt-theme/'": `sourceRoot: 'app/themes/${answers.projectName}'`
    }
  }
}
