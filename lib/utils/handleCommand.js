'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.default = handleCommand;

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _inquirer = require('inquirer');

var _inquirer2 = _interopRequireDefault(_inquirer);

var _getRootPath = require('./getRootPath');

var _getRootPath2 = _interopRequireDefault(_getRootPath);

var _config = require('./config');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function handleCommand(commandObject, fromEnv, toEnv, subCommand, skipRootExecution) {
  return function (argv) {
    switchToRoot(skipRootExecution || argv.force).then(function () {
      // return if subcommand was called but handler was registered to main command
      // in this case yarg first calls the handler for the subcommand and afterwards
      // for main.
      // however, this handler should only be executed once
      if (!subCommand && argv._.length !== 1) {
        return _bluebird2.default.resolve();
      }
      fromEnv = resolveEnv(fromEnv, argv);
      toEnv = resolveEnv(toEnv, argv);

      var config = (0, _config.getConfig)(argv);
      var commandsToRun = filterValidCommands(commandObject.commands, subCommand);
      var answersFromConfig = (0, _config.mapConfigToAnswers)(config, fromEnv, toEnv);

      _bluebird2.default.resolve(commandsToRun).tap().tap(checkRequirements).then(promptMissingConfig(answersFromConfig)).tap(runCommands(commandsToRun), function (err) {
        return console.log(err);
      })
      // TODO: save config before runCommands but make sure to save in right folder
      // relevant for setup command if installBedrock is called because of chdir
      .tap((0, _config.saveConfig)(argv, config, fromEnv, toEnv));
    });
  };
}

function resolveEnv(env, argv) {
  if (env && env.indexOf('argv.') === 0) {
    return argv[env.replace('argv.', '')];
  } else {
    return env;
  }
}

function filterValidCommands(commands, subCommands) {
  if (!subCommands) {
    return commands;
  } else {
    subCommands = [].concat(subCommands);
    return _lodash2.default.pickBy(commands, function (cmd, name) {
      return _lodash2.default.includes(subCommands, name);
    });
  }
}

function checkRequirements(commands) {
  var requirements = _lodash2.default.map(_lodash2.default.values(commands), 'requirements');
  requirements = _lodash2.default.union.apply(_lodash2.default, _toConsumableArray(requirements));
  return _bluebird2.default.all(requirements.map(function (fn) {
    return fn();
  }));
}

function promptMissingConfig(answersFromConfig) {
  return function (commands) {
    var prompts = _lodash2.default.map(_lodash2.default.values(commands), 'prompts');
    prompts = _lodash2.default.union.apply(_lodash2.default, _toConsumableArray(prompts)).filter(function (prompt) {
      return !_lodash2.default.has(answersFromConfig, prompt.name);
    });
    return _inquirer2.default.prompt(prompts).then(function (answers) {
      return _lodash2.default.merge({}, answersFromConfig, answers);
    });
  };
}

function runCommands(commands) {
  var runs = _lodash2.default.map(_lodash2.default.values(commands), 'run');
  return function (answers) {
    var allRuns = _bluebird2.default.resolve();
    runs.forEach(function (fn) {
      allRuns = allRuns.then(function () {
        return fn(answers);
      });
    });
    return allRuns;
  };
}

function switchToRoot(force) {
  if (!force) {
    var _ret = function () {
      var rootPath = (0, _getRootPath2.default)();
      if (rootPath !== process.cwd()) {
        return {
          v: _inquirer2.default.prompt([{
            type: 'confirm',
            name: 'switchToRoot',
            message: 'Do you want to switch to ' + rootPath + ' to execute the command?',
            default: true
          }]).then(function (answers) {
            if (answers.switchToRoot) process.chdir(rootPath);
          })
        };
      }
    }();

    if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object") return _ret.v;
  }
  return _bluebird2.default.resolve();
}