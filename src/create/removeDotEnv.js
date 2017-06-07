import exec from '../utils/executeCommand'

export const description = 'initialize new git repo and push to origin'

export const runMessage = 'Initializing git repo...'

export const requirements = [
]

export const prompts = [
]

export function run (answers) {
  let cmds = [
    'rm .env'
  ]
  return exec(cmds)
}
