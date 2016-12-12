export const command = 'setup [<command>]'
export const desc = 'Manage set of tracked repos'
export function builder (yargs) {
  console.log('build setup')
  return yargs.commandDir('setup')
  .option('c', {
    alias: 'config',
    default: '.flyntrc',
    describe: 'path of the config file',
    type: 'string',
    normalize: true
  })
}
export function handler (argv) {
  console.log('handler setup', argv, argv.config)
  return {}
}
