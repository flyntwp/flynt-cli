import path from 'path'
import fs from 'fs'
import exec from '../utils/executeCommand'

import * as allRequirements from '../requirements'
import * as allPrompts from '../prompts'

import phpDependencies from '../utils/phpDependencies'

export const requirements = [
  allRequirements.composer
]

export const prompts = [
  allPrompts.acfProKey
]

export function run (answers) {
  const composerJson = require(path.join(process.cwd(), 'composer.json'))
  composerJson.repositories.push(
    repos.flyntCore,
    repos.acfFieldGroupComposer
  )
  if (answers.acfProKey) {
    composerJson.repositories.push(repos.acfPro)
  }
  composerJson.extra['installer-paths']['web/app/mu-plugins/{$name}/'].push(
    'flyntwp/flynt-core',
    'flyntwp/acf-field-group-composer'
  )
  fs.writeFileSync(path.join(process.cwd(), 'composer.json'), JSON.stringify(composerJson, null, 2))
  const composerRequire = [
    `"timber/timber:${phpDependencies['timber/timber']}"`,
    `"flyntwp/flynt-core:${phpDependencies['flyntwp/flynt-core']}"`,
    `"flyntwp/acf-field-group-composer:${phpDependencies['flyntwp/acf-field-group-composer']}"`
  ]
  const cmds = []
  if (answers.acfProKey) {
    composerRequire.push('"advanced-custom-fields/advanced-custom-fields-pro:*"')
    cmds.push(`export ACF_PRO_KEY="${answers.acfProKey}"`)
  }
  cmds.push(`composer require ${composerRequire.join(' ')}`)

  return exec(cmds)
}

const repos = {
  flyntCore: {
    type: 'git',
    url: 'git@github.com:bleech/wp-starter-plugin.git'
  },
  acfFieldGroupComposer: {
    type: 'git',
    url: 'git@github.com:bleech/acf-field-group-composer.git'
  },
  acfPro: {
    type: 'package',
    package: {
      name: 'advanced-custom-fields/advanced-custom-fields-pro',
      version: phpDependencies['advanced-custom-fields/advanced-custom-fields-pro'],
      type: 'wordpress-plugin',
      dist: {
        type: 'zip',
        url: 'https://connect.advancedcustomfields.com/index.php?p=pro&a=download'
      },
      require: {
        'philippbaschke/acf-pro-installer': phpDependencies['philippbaschke/acf-pro-installer'],
        'composer/installers': phpDependencies['composer/installers']
      }
    }
  }
}
