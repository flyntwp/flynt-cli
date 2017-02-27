import exec from '../utils/executeCommand'

import * as allPrompts from '../prompts'
import * as allRequirements from '../requirements'

export const requirements = [
  allRequirements.wpCli
]

export const prompts = [
  allPrompts.themeName
]

export function run (answers) {
  let cmds = [
    'wp option set blog_public 0',
    `wp theme activate ${answers.themeName}`,
    'echo "apache_modules:\n  - mod_rewrite\n" >> wp-cli.yml',
    'wp rewrite flush --hard',
    'wp plugin activate --all'
  ]
  return exec(cmds)
}
