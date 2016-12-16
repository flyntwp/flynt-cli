#!/usr/bin/env node
import yargs from 'yargs'

import {getConfig, saveConfig, mapConfigToAnswers} from './utils/config'

import * as setupCmd from './setup/index'
import * as cloneCmd from './clone/index'
import * as deployCmd from './deploy/index'
// import {builder} from './cmds/setup'

yargs
.command(
  'setup',
  'Setup a new flynt project',
  function (yargs) {
    setupCmd.cmds.forEach(function (cmd) {
      yargs = yargs.command(cmd, '', {}, handleSetupCmd('cmd'))
    })
    return yargs
  },
  handleSetupCmd('setup')
)
.command(
  'clone',
  'Clone database and medie files between environments',
  function (yargs) {
    cloneCmd.cmds.forEach(function (cmd) {
      yargs = yargs.command(cmd, '', {}, handleCloneCmd('cmd'))
    })
    return yargs
    .option('f', {
      alias: 'from',
      // global: true,
      describe: 'Environment to clone from',
      type: 'string',
      default: 'development'
    })
    .option('t', {
      alias: 'to',
      // global: true,
      describe: 'Environment to clone to',
      type: 'string',
      default: 'local'
    })
  },
  handleCloneCmd('clone')
)
.command(
  'deploy',
  'Deploy source code from local to any environment',
  function (yargs) {
    cloneCmd.cmds.forEach(function (cmd) {
      yargs = yargs.command(cmd, '', {}, handleDeployCmd('cmd'))
    })
    return yargs
    .option('t', {
      alias: 'to',
      // global: true,
      describe: 'Environment to clone to',
      type: 'string',
      default: 'development'
    })
  },
  handleDeployCmd('deploy')
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

function handleSetupCmd (location) {
  return function (argv) {
    if (location === 'setup' && argv._.length === 1) {
      const config = getConfig(argv)
      const run = setupCmd.run(null, mapConfigToAnswers(config, argv.env))
      return run.then(saveConfig(argv, config, argv.env))
    } else if (location === 'cmd' && argv._.length === 2) {
      const config = getConfig(argv)
      const run = setupCmd.run(argv._[1], mapConfigToAnswers(config, argv.env))
      return run.then(saveConfig(argv, config, argv.env))
    }
  }
}

function handleCloneCmd (location) {
  return function (argv) {
    if (location === 'clone' && argv._.length === 1) {
      const config = getConfig(argv)
      const run = cloneCmd.run(null, mapConfigToAnswers(config, argv.from, argv.to))
      return run.then(saveConfig(argv, config, argv.from, argv.to))
    } else if (location === 'cmd' && argv._.length === 2) {
      const config = getConfig(argv)
      const run = cloneCmd.run(argv._[1], mapConfigToAnswers(config, argv.from, argv.to))
      return run.then(saveConfig(argv, config, argv.from, argv.to))
    }
  }
}

function handleDeployCmd (location) {
  return function (argv) {
    if (location === 'deploy' && argv._.length === 1) {
      const config = getConfig(argv)
      const run = deployCmd.run(null, mapConfigToAnswers(config, 'local', argv.to))
      return run.then(saveConfig(argv, config, 'local', argv.to))
    } else if (location === 'cmd' && argv._.length === 2) {
      const config = getConfig(argv)
      const run = deployCmd.run(argv._[1], mapConfigToAnswers(config, 'local', argv.to))
      return run.then(saveConfig(argv, config, 'local', argv.to))
    }
  }
}
