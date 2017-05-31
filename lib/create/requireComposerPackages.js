'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.prompts = exports.requirements = exports.description = undefined;
exports.run = run;

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _executeCommand = require('../utils/executeCommand');

var _executeCommand2 = _interopRequireDefault(_executeCommand);

var _unionWith = require('lodash/unionWith');

var _unionWith2 = _interopRequireDefault(_unionWith);

var _isEqual = require('lodash/isEqual');

var _isEqual2 = _interopRequireDefault(_isEqual);

var _requirements = require('../requirements');

var allRequirements = _interopRequireWildcard(_requirements);

var _prompts = require('../prompts');

var allPrompts = _interopRequireWildcard(_prompts);

var _phpDependencies = require('../utils/phpDependencies');

var _phpDependencies2 = _interopRequireDefault(_phpDependencies);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const description = exports.description = 'install additional PHP composer packages';

const requirements = exports.requirements = [allRequirements.composer];

const prompts = exports.prompts = [allPrompts.composerRepos, allPrompts.composerPackages, allPrompts.acfProKey];

function run(answers) {
  const composerJson = require(_path2.default.join(process.cwd(), 'composer.json'));
  composerJson.repositories = (0, _unionWith2.default)(composerJson.repositories, [repos.flyntCore], _isEqual2.default);
  if (answers.acfProKey) {
    composerJson.repositories = (0, _unionWith2.default)(composerJson.repositories, [repos.acfPro], _isEqual2.default);
  }
  if (answers.composerRepos) {
    const composerRepos = answers.composerRepos.map(function (repo) {
      return {
        type: 'composer',
        url: repo
      };
    });
    composerJson.repositories = (0, _unionWith2.default)(composerJson.repositories, composerRepos, _isEqual2.default);
  }
  composerJson.extra['installer-paths']['web/app/mu-plugins/{$name}/'] = (0, _unionWith2.default)(composerJson.extra['installer-paths']['web/app/mu-plugins/{$name}/'], ['flyntwp/flynt-core', 'flyntwp/acf-field-group-composer'], _isEqual2.default);
  _fs2.default.writeFileSync(_path2.default.join(process.cwd(), 'composer.json'), JSON.stringify(composerJson, null, 2));
  const cmds = [];
  const composerRequire = [`"timber/timber:${ _phpDependencies2.default['timber/timber'] }"`, `"flyntwp/flynt-core:${ _phpDependencies2.default['flyntwp/flynt-core'] }"`, `"flyntwp/acf-field-group-composer:${ _phpDependencies2.default['flyntwp/acf-field-group-composer'] }"`];
  if (answers.composerPackages) {
    composerRequire.push.apply(composerRequire, answers.composerPackages);
  }
  if (answers.acfProKey) {
    composerRequire.push('"advanced-custom-fields/advanced-custom-fields-pro:*"');
    cmds.push(`export ACF_PRO_KEY="${ answers.acfProKey }"`);
  }
  cmds.push(`composer require ${ composerRequire.join(' ') }`);

  return (0, _executeCommand2.default)(cmds);
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
  }
};