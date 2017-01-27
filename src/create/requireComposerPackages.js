import exec from '../utils/executeCommand'

import * as allRequirements from '../requirements'

import phpDependencies from '../utils/phpDependencies'

export const requirements = [
  allRequirements.composer
]

export const prompts = [
]

export function run (answers) {
  let cmds = [
    'composer config repositories.flyntCore git "git@github.com:bleech/wp-starter-plugin.git"',
    'composer config repositories.acfFieldGroupComposer git "git@github.com:bleech/acf-field-group-composer.git"',
    `composer require "timber/timber:${phpDependencies['timber/timber']}" "flyntwp/flynt-core:${phpDependencies['flyntwp/flynt-core']}" flyntwp/acf-field-group-composer:${phpDependencies['flyntwp/acf-field-group-composer']}`
  ]
  return exec(cmds)
}
