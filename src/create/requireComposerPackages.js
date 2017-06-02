import path from 'path'
import fs from 'fs'
import exec from '../utils/executeCommand'
import unionWith from 'lodash/unionWith'
import isEqual from 'lodash/isEqual'

import * as allRequirements from '../requirements'
import * as allPrompts from '../prompts'

import phpDependencies from '../utils/phpDependencies'

export const description = 'install additional PHP composer packages'

export const runMessage = 'Installing PHP composer dependencies...'

export const requirements = [
  allRequirements.composer
]

export const prompts = [
  allPrompts.composerRepos,
  allPrompts.composerPackages,
  allPrompts.acfProKey
]

export function run (answers) {
  const composerJson = require(path.join(process.cwd(), 'composer.json'))
  composerJson.repositories = unionWith(composerJson.repositories, [
    repos.flyntCore
  ], isEqual)
  if (answers.acfProKey) {
    composerJson.repositories = unionWith(composerJson.repositories, [
      repos.acfPro
    ], isEqual)
  }
  if (answers.composerRepos) {
    const composerRepos = answers.composerRepos.map(function (repo) {
      return {
        type: 'composer',
        url: repo
      }
    })
    composerJson.repositories = unionWith(
      composerJson.repositories,
      composerRepos,
      isEqual
    )
  }
  composerJson.extra['installer-paths']['web/app/mu-plugins/{$name}/'] = unionWith(
    composerJson.extra['installer-paths']['web/app/mu-plugins/{$name}/'],
    ['flyntwp/flynt-core', 'flyntwp/acf-field-group-composer'],
    isEqual
  )
  fs.writeFileSync(path.join(process.cwd(), 'composer.json'), JSON.stringify(composerJson, null, 2))
  const cmds = []
  const composerRequire = [
    `"timber/timber:${phpDependencies['timber/timber']}"`,
    `"flyntwp/flynt-core:${phpDependencies['flyntwp/flynt-core']}"`,
    `"flyntwp/acf-field-group-composer:${phpDependencies['flyntwp/acf-field-group-composer']}"`
  ]
  if (answers.composerPackages) {
    composerRequire.push.apply(
      composerRequire,
      answers.composerPackages
    )
  }
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
