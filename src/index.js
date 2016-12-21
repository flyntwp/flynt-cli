#!/usr/bin/env node
import yargs from 'yargs'

import handleCommand from './utils/handleCommand'
import buildArguments from './utils/buildArguments'

import * as setupCmd from './setup/index'
import * as cloneCmd from './clone/index'
import * as deployCmd from './deploy/index'

yargs
.command('setup',
  'Setup a new flynt project',
  buildArguments(setupCmd, 'argv.env'),
  handleCommand(setupCmd, 'argv.env')
)
.command('clone',
  'Clone database and medie files between environments',
  function (yargs) {
    buildArguments(cloneCmd, 'argv.from', 'argv.to', {
      from: {
        alias: 'f',
        describe: 'Environment to clone from',
        type: 'string',
        default: 'development'
      },
      to: {
        alias: 't',
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
    buildArguments(cloneCmd, 'local', 'argv.to', {
      to: {
        alias: 't',
        describe: 'Environment to clone to',
        type: 'string',
        default: 'development'
      }
    })(yargs)
  },
  handleCommand(deployCmd, 'local', 'argv.to')
)
.option('c', {
  alias: 'config',
  global: true,
  describe: 'Read config from file?',
  type: 'boolean'
})
.option('s', {
  alias: 'saveConfig',
  global: true,
  describe: 'Write config to file?',
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
.help()
.argv
