export const command = 'foo'
export const desc = 'foo bar'
export function builder (yargs) {
  console.log('build foo')
  return yargs
}
export function handler (argv) {
  console.log('handle foo', argv)
  return {}
}
