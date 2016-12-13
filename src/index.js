#!/usr/bin/env node
import fs from 'fs'
import path from 'path'
import yargs from 'yargs'
import _ from 'lodash'

import * as setupCmd from './setup/index'
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
.help()
.argv

function handleSetupCmd (location) {
  return function (argv) {
    console.log(location, argv.c, argv.s, argv.configPath)
    let config = {}
    if (argv.c) {
      try {
        config = require(path.join(process.cwd(), argv.configPath))
      } catch (e) {}
    }
    let run
    if (location === 'setup' && argv._.length === 1) {
      run = setupCmd.run(null, config)
    } else if (location === 'cmd' && argv._.length === 2) {
      run = setupCmd.run(argv._[1], config)
    } else {
      return
    }
    console.log(run)
    run.then(function (answers) {
      console.log('saving', argv.s, answers)
      if (argv.s) {
        _.merge(config, answers)
        const json = JSON.stringify(config, null, 2)
        fs.writeFileSync(argv.configPath, json, 'utf-8')
      }
    })
  }
}
