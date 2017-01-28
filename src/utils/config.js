import fs from 'fs'
import path from 'path'
import _ from 'lodash'

import * as configFields from '../configFields'

export function getConfig (argv) {
  let config = {}
  if (!argv.skipReadConfig) {
    try {
      config = require(path.join(process.cwd(), argv.configPath))
    } catch (e) {}
  }
  return config
}

export function saveConfig (argv, config, env, envRemote = null) {
  return function (answers) {
    if (!argv.skipWriteConfig) {
      config = _.merge({}, config, mapAnswersToConfig(answers, env, envRemote))
      const json = JSON.stringify(config, null, 2)
      fs.writeFileSync(argv.configPath, json, 'utf-8')
    }
    return answers
  }
}

export function mapConfigToAnswers (config, env, envRemote) {
  const answers = {}
  _.forEach(configFields.mapping, function (value, key) {
    const configKey = _.includes(configFields.globals, value)
      ? value : `environments.${env}.${value}`
    if (_.has(config, configKey)) {
      _.set(answers, key, _.get(config, configKey))
    }
    if (envRemote && !_.includes(configFields.globals, value)) {
      const configKeyRemote = `environments.${envRemote}.${value}`
      if (_.has(config, configKeyRemote)) {
        _.set(answers, key + 'Remote', _.get(config, configKeyRemote))
      }
    }
  })
  return answers
}

export function mapAnswersToConfig (answers, env, envRemote) {
  const config = {}
  _.forEach(answers, function (value, key) {
    const configKey = configFields.mapping[key] || key
    if (_.includes(configFields.globals, configKey)) {
      _.set(config, configKey, value)
    } else {
      if (key.substr(key.length - 'Remote'.length) === 'Remote') {
        key = key.substr(0, key.length - 'Remote'.length)
        const configKeyRemote = configFields.mapping[key] || key
        _.set(config, `environments.${envRemote}.${configKeyRemote}`, value)
      } else {
        _.set(config, `environments.${env}.${configKey}`, value)
      }
    }
  })
  return config
}
