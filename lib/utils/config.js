'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getConfig = getConfig;
exports.saveConfig = saveConfig;
exports.mapConfigToAnswers = mapConfigToAnswers;
exports.mapAnswersToConfig = mapAnswersToConfig;

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _configFields = require('../configFields');

var configFields = _interopRequireWildcard(_configFields);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getConfig(argv) {
  var config = {};
  if (argv.c) {
    try {
      config = require(_path2.default.join(process.cwd(), argv.configPath));
    } catch (e) {}
  }
  return config;
}

function saveConfig(argv, config, env) {
  var envRemote = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;

  return function (answers) {
    if (argv.s) {
      config = _lodash2.default.merge({}, config, mapAnswersToConfig(answers, env, envRemote));
      var json = JSON.stringify(config, null, 2);
      _fs2.default.writeFileSync(argv.configPath, json, 'utf-8');
    }
    return answers;
  };
}

function mapConfigToAnswers(config, env, envRemote) {
  var answers = {};
  _lodash2.default.forEach(configFields.mapping, function (value, key) {
    var configKey = _lodash2.default.includes(configFields.globals, value) ? value : 'environments.' + env + '.' + value;
    if (_lodash2.default.has(config, configKey)) {
      _lodash2.default.set(answers, key, _lodash2.default.get(config, configKey));
    }
    if (envRemote && !_lodash2.default.includes(configFields.globals, value)) {
      var configKeyRemote = 'environments.' + envRemote + '.' + value;
      if (_lodash2.default.has(config, configKeyRemote)) {
        _lodash2.default.set(answers, key + 'Remote', _lodash2.default.get(config, configKeyRemote));
      }
    }
  });
  return answers;
}

function mapAnswersToConfig(answers, env, envRemote) {
  var config = {};
  _lodash2.default.forEach(answers, function (value, key) {
    var configKey = configFields.mapping[key] || key;
    if (_lodash2.default.includes(configFields.globals, configKey)) {
      _lodash2.default.set(config, configKey, value);
    } else {
      if (key.substr(key.length - 'Remote'.length) === 'Remote') {
        key = key.substr(0, key.length - 'Remote'.length);
        var configKeyRemote = configFields.mapping[key] || key;
        _lodash2.default.set(config, 'environments.' + envRemote + '.' + configKeyRemote, value);
      } else {
        _lodash2.default.set(config, 'environments.' + env + '.' + configKey, value);
      }
    }
  });
  return config;
}