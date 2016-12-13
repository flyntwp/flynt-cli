import childProcess from 'child_process'
import Promise from 'bluebird'

import * as allPrompts from '../prompts'
import * as allRequirements from '../requirements'

export const requirements = [
  allRequirements.wpCli,
]

export const prompts = [
  allPrompts.projectName,
]

export function run (answers) {
  let cmds = [
    'wp option set blog_public 0',
    `wp theme activate ${answers.projectName}`,
    // 'plugin activate acf-role-selector-field',
    // 'plugin activate advanced-custom-fields-pro',
    // 'plugin activate wp-h5bp-htaccess ',
    // 'plugin activate wp-migrate-db-pro',
    // 'plugin activate wp-migrate-db-pro-cli',
    // 'plugin activate wp-migrate-db-pro-media-files',
  ]
  return new Promise(function (resolve, reject) {
    let exec = childProcess.exec(cmds.join(' && '), function () {
      resolve()
    })
    exec.stdout.pipe(process.stdout)
    exec.stderr.pipe(process.stderr)
  })
}
