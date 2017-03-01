import replaceInFiles from '../utils/replaceInFiles'

export const description = 'add paths to gitignore'

export const requirements = [
]

export const prompts = [
]

export function run (answers) {
  return replaceInFiles(getReplacements())
}

function getReplacements () {
  return {
    '.gitignore': {
      '.env\n': ''
    }
  }
}
