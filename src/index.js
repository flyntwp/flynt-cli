#!/usr/bin/env node
import yargs from 'yargs'
import inquirer from 'inquirer'
import Promise from 'bluebird'
import _ from 'lodash'

import * as setupCmd from './setup/index'
// import {builder} from './cmds/setup'

yargs
.command(
  'setup',
  'Setup a new flynt project',
  function (yargs) {
    setupCmd.cmds.forEach(function (cmd) {
      yargs = yargs.command(cmd, '', {}, handleSetupCmd)
    return yargs
  },
  handleSetupCmd
)
.help()
.argv

function handleSetupCmd (argv) {
  if (argv._.length === 1) {
    setupCmd.run()
  } else if (argv._.length === 2) {
    setupCmd.run(argv._[1])
  }
}
