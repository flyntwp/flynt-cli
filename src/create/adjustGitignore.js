import replaceInFiles from '../utils/replaceInFiles'
import addLinesToFiles from '../utils/addLinesToFiles'

export const description = 'add paths to gitignore'

export const requirements = [
]

export const prompts = [
]

export function run (answers) {
  return replaceInFiles(getReplacements())
  .then(() => addLinesToFiles(getLinesToAdd()))
}

function getReplacements () {
  return {
    '.gitignore': {
      '.env\n': '',
      'web/.htaccess\n': ''
    }
  }
}

function getLinesToAdd () {
  return {
    '.gitignore': {
      lines: [
        '/tmp/',
        '/backup/'
      ],
      prepend: true
    }
  }
}
