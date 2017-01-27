'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.prompts = exports.requirements = undefined;
exports.run = run;

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _executeCommand = require('../utils/executeCommand');

var _executeCommand2 = _interopRequireDefault(_executeCommand);

var _requirements = require('../requirements');

var allRequirements = _interopRequireWildcard(_requirements);

var _prompts = require('../prompts');

var allPrompts = _interopRequireWildcard(_prompts);

var _phpDependencies = require('../utils/phpDependencies');

var _phpDependencies2 = _interopRequireDefault(_phpDependencies);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var requirements = exports.requirements = [allRequirements.composer];

var prompts = exports.prompts = [allPrompts.acfProKey, allPrompts.migrateDbProKey];

function run(answers) {
  var composerJson = require(_path2.default.join(process.cwd(), 'composer.json'));
  composerJson.repositories = Object.assign(composerJson.repositories, repos);
  composerJson.extra['installer-paths']['web/app/mu-plugins/{$name}/'].push('flyntwp/flynt-core', 'flyntwp/acf-field-group-composer');
  _fs2.default.writeFileSync(_path2.default.join(process.cwd(), 'composer.json'), JSON.stringify(composerJson, null, 2));
  var composerRequire = ['"timber/timber:' + _phpDependencies2.default['timber/timber'] + '"', '"flyntwp/flynt-core:' + _phpDependencies2.default['flyntwp/flynt-core'] + '"', '"flyntwp/acf-field-group-composer:' + _phpDependencies2.default['flyntwp/acf-field-group-composer'] + '"'];
  var cmds = [];
  if (answers.acfProKey) {
    composerRequire.push('"advanced-custom-fields/advanced-custom-fields-pro:*"');
    cmds.push('export ACF_PRO_KEY="' + answers.acfProKey + '"');
  }
  if (answers.migrateDbProKey) {
    composerRequire.push('"deliciousbrains/wp-migrate-db-pro:*"', '"deliciousbrains/wp-migrate-db-pro-media-files:*"');
    cmds.push('export WPM_PRO_KEY="' + answers.migrateDbProKey + '"');
  }
  cmds.push('composer require ' + composerRequire.join(' '));

  return (0, _executeCommand2.default)(cmds);
}

var repos = {
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
      version: _phpDependencies2.default['advanced-custom-fields/advanced-custom-fields-pro'],
      type: 'wordpress-plugin',
      dist: {
        type: 'zip',
        url: 'https://connect.advancedcustomfields.com/index.php?p=pro&a=download'
      },
      require: {
        'philippbaschke/acf-pro-installer': _phpDependencies2.default['philippbaschke/acf-pro-installer'],
        'composer/installers': _phpDependencies2.default['composer/installers']
      }
    }
  },
  migrateDbPro: {
    type: 'package',
    package: {
      name: 'deliciousbrains/wp-migrate-db-pro',
      type: 'wordpress-plugin',
      version: _phpDependencies2.default['deliciousbrains/wp-migrate-db-pro'],
      dist: {
        type: 'zip',
        url: 'https://deliciousbrains.com/dl/wp-migrate-db-pro-latest.zip?'
      },
      require: {
        'igniteonline/wpm-pro-installer': _phpDependencies2.default['igniteonline/wpm-pro-installer'],
        'composer/installers': _phpDependencies2.default['composer/installers']
      }
    }
  },
  migrateDbProMediaFiles: {
    type: 'package',
    package: {
      name: 'deliciousbrains/wp-migrate-db-pro-media-files',
      type: 'wordpress-plugin',
      version: _phpDependencies2.default['deliciousbrains/wp-migrate-db-pro-media-files'],
      dist: {
        type: 'zip',
        url: 'https://deliciousbrains.com/dl/wp-migrate-db-pro-media-files-latest.zip?'
      },
      require: {
        'igniteonline/wpm-pro-installer': _phpDependencies2.default['igniteonline/wpm-pro-installer'],
        'composer/installers': _phpDependencies2.default['composer/installers']
      }
    }
  }
};