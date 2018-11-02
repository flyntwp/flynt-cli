import replaceInFiles from '../utils/replaceInFiles'
import addLinesToFiles from '../utils/addLinesToFiles'

export const description = 'add paths to gitignore'

export const runMessage = 'Adding paths to .gitignore...'

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
        '/backup/',
        'web/app/wflogs',
        'web/app/cache',
        'web/app/advanced-cache.php',
        'web/app/wp-cache-config.php'
      ],
      prepend: true
    }
  }
}
