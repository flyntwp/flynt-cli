import replace from 'replace-in-file'

export const requirements = [
]

export const prompts = [
]

export function run (answers) {
  return replace({
    files: '.gitignore',
    replace: /\.env\n/g,
    with: ''
  })
}
