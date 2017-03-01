#!/usr/bin/env node
import yargs from 'yargs'

import handleCommand from './utils/handleCommand'
import buildArguments from './utils/buildArguments'

import * as createCmd from './create'
import * as setupCmd from './setup'
import * as installCmd from './install'
import * as upgradeCmd from './upgrade'
import * as startCmd from './start'
import * as buildCmd from './build'
import * as cloneCmd from './clone'
import * as deployCmd from './deploy'

yargs
.usage('Usage: $0 <command> [<subcommand>] [options]')
.command('create',
  'Create a new flynt project',
  buildArguments(createCmd, 'argv.env'),
  handleCommand(createCmd, 'argv.env')
)
.command('setup',
  'Setup an existing flynt project',
  buildArguments(setupCmd, 'argv.env'),
  handleCommand(setupCmd, 'argv.env')
)
.command('install',
  'Install flynt dependencies (yarn, composer)',
  buildArguments(installCmd, 'argv.env'),
  handleCommand(installCmd, 'argv.env')
)
.command('upgrade',
  'Upgrade flynt dependencies (yarn, composer)',
  buildArguments(upgradeCmd, 'argv.env'),
  handleCommand(upgradeCmd, 'argv.env')
)
.command('start',
  'Run yarn start for flynt theme',
  buildArguments(startCmd, 'argv.env'),
  handleCommand(startCmd, 'argv.env')
)
.command('build',
  'Run yarn build for flynt theme',
  buildArguments(buildCmd, 'argv.env'),
  handleCommand(buildCmd, 'argv.env')
)
.command('clone',
  'Clone database and media files between environments',
  function (yargs) {
    buildArguments(cloneCmd, 'argv.from', 'argv.to', {
      from: {
        describe: 'Environment to clone from',
        type: 'string',
        default: 'development'
      },
      to: {
        describe: 'Environment to clone to',
        type: 'string',
        default: 'local'
      }
    })(yargs)
  },
  handleCommand(cloneCmd, 'argv.from', 'argv.to')
)
.command('deploy',
  'Deploy source code from local to any environment',
  function (yargs) {
    buildArguments(deployCmd, 'local', 'argv.to', {
      to: {
        describe: 'Environment to clone to',
        type: 'string',
        default: 'development'
      },
      n: {
        alias: 'dry-run',
        describe: 'Perform trial run',
        type: 'boolean'
      }
    })(yargs)
  },
  handleCommand(deployCmd, 'local', 'argv.to')
)
.option('skipReadConfig', {
  global: true,
  describe: 'Do not read config from file',
  type: 'boolean'
})
.option('skipWriteConfig', {
  global: true,
  describe: 'Do not write config to file',
  type: 'boolean'
})
.option('configPath', {
  global: true,
  default: './.flynt.json',
  describe: 'File to read from and save config to.',
  type: 'string'
})
.option('e', {
  alias: ['env', 'environment'],
  global: true,
  default: 'local',
  describe: 'Specify current environment',
  type: 'string'
})
.option('f', {
  alias: 'force',
  global: true,
  describe: 'Force execution in current directory',
  type: 'boolean'
})
.locale('en')
.help()
.argv
