#!/usr/bin/env node
import fs from 'fs'
import path from 'path'
import yargs from 'yargs'
import _ from 'lodash'

import * as setupCmd from './setup/index'
import * as cloneCmd from './clone/index'
import * as deployCmd from './deploy/index'
// import {builder} from './cmds/setup'

const configMapping = {
  projectName: 'projectName',
  basePath: 'basePath',
  uploadsPath: 'uploadsPath',
  deployPath: 'deployPath',
  deployExcludes: 'deployExcludes',
  rsyncFlags: 'rsyncFlags',
  dbHost: 'db.host',
  dbRootUser: 'db.root.user',
  dbRootPassword: 'db.root.password',
  dbName: 'db.name',
  dbUser: 'db.user',
  dbPassword: 'db.password',
  sshHost: 'ssh.host',
  sshUser: 'ssh.user',
  sshPort: 'ssh.port',
  wpEnv: 'wp.env',
  wpHome: 'wp.home',
  wpSiteurl: 'wp.siteurl',
  wpTitle: 'wp.title',
  wpAdminName: 'wp.admin.name',
  wpAdminEmail: 'wp.admin.email',
  gitRepo: 'repository'
}

const configGlobals = [
  'projectName',
  'repository'
]

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

function getConfig (argv) {
  let config = {}
  if (argv.c) {
    try {
      config = require(path.join(process.cwd(), argv.configPath))
    } catch (e) {}
  }
  return config
}

function saveConfig (argv, config, env, envRemote = null) {
  return function (answers) {
    if (argv.s) {
      config = _.merge({}, config, mapAnswersToConfig(answers, env, envRemote))
      const json = JSON.stringify(config, null, 2)
      fs.writeFileSync(argv.configPath, json, 'utf-8')
    }
  }
}

function mapConfigToAnswers (config, env, envRemote) {
  const answers = {}
  _.forEach(configMapping, function (value, key) {
    const configKey = _.includes(configGlobals, value)
      ? value : `environments.${env}.${value}`
    if (_.has(config, configKey)) {
      _.set(answers, key, _.get(config, configKey))
    }
    if (envRemote && !_.includes(configGlobals, value)) {
      const configKeyRemote = `environments.${envRemote}.${value}`
      if (_.has(config, configKeyRemote)) {
        _.set(answers, key + 'Remote', _.get(config, configKeyRemote))
      }
    }
  })
  return answers
}

function mapAnswersToConfig (answers, env, envRemote) {
  const config = {}
  _.forEach(answers, function (value, key) {
    const configKey = configMapping[key] || key
    if (_.includes(configGlobals, configKey)) {
      _.set(config, configKey, value)
    } else {
      if (key.substr(key.length - 'Remote'.length) === 'Remote') {
        key = key.substr(0, key.length - 'Remote'.length)
        const configKeyRemote = configMapping[key] || key
        _.set(config, `environments.${envRemote}.${configKeyRemote}`, value)
      } else {
        _.set(config, `environments.${env}.${configKey}`, value)
      }
    }
  })
  return config
}
