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
  createCmd.description,
  buildArguments(createCmd, 'argv.env'),
  handleCommand(createCmd, 'argv.env')
)
.command('setup',
  setupCmd.description,
  buildArguments(setupCmd, 'argv.env'),
  handleCommand(setupCmd, 'argv.env')
)
.command('install',
  installCmd.description,
  buildArguments(installCmd, 'argv.env'),
  handleCommand(installCmd, 'argv.env')
)
.command('upgrade',
  upgradeCmd.description,
  buildArguments(upgradeCmd, 'argv.env'),
  handleCommand(upgradeCmd, 'argv.env')
)
.command('start',
  startCmd.description,
  buildArguments(startCmd, 'argv.env'),
  handleCommand(startCmd, 'argv.env')
)
.command('build',
  buildCmd.description,
  buildArguments(buildCmd, 'argv.env'),
  handleCommand(buildCmd, 'argv.env')
)
.command('clone',
  cloneCmd.description,
  buildArguments(cloneCmd, 'argv.from', 'argv.to', cloneCmd.options),
  handleCommand(cloneCmd, 'argv.from', 'argv.to')
)
.command('deploy',
  deployCmd.description,
  buildArguments(deployCmd, 'local', 'argv.to', deployCmd.options),
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
