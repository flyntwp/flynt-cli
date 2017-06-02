'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = handleCommand;

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _inquirer = require('inquirer');

var _inquirer2 = _interopRequireDefault(_inquirer);

var _ora = require('ora');

var _ora2 = _interopRequireDefault(_ora);

var _getRootPath = require('./getRootPath');

var _getRootPath2 = _interopRequireDefault(_getRootPath);

var _Errors = require('./Errors');

var _log = require('./log');

var _log2 = _interopRequireDefault(_log);

var _notifier = require('./notifier');

var notifier = _interopRequireWildcard(_notifier);

var _config = require('./config');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function handleCommand(commandObject, fromEnv, toEnv, subCommand) {
  return function (argv) {
    // return if subcommand was called but handler was registered to main command
    // in this case yarg first calls the handler for the subcommand and afterwards
    // for main.
    // however, this handler should only be executed once
    if (!subCommand && argv._.length !== 1) {
      return _bluebird2.default.resolve();
    }
    fromEnv = resolveEnv(fromEnv, argv);
    toEnv = resolveEnv(toEnv, argv);

    if (argv.verbose) {
      (0, _log.setLevel)('DEBUG');
    }

    const validCommandsValues = filterValidCommands(commandObject.commands, subCommand);
    const commandsToRun = _lodash2.default.map(validCommandsValues);

    switchToRoot(_lodash2.default.values(validCommandsValues)[0].notInRootFolder || argv.force).then(function () {
      const config = (0, _config.getConfig)(argv);
      const answersFromConfig = (0, _config.mapConfigToAnswers)(config, fromEnv, toEnv);

      const whenToSaveConfigIndex = getWhenToSaveConfigIndex(validCommandsValues);
      commandsToRun.splice(whenToSaveConfigIndex, 0, {
        run: (0, _config.saveConfig)(argv, config, fromEnv, toEnv),
        name: 'saveConfig',
        runMessage: 'Saving config'
      });

      _bluebird2.default.resolve(validCommandsValues).tap(checkRequirements).then(promptMissingConfig(answersFromConfig, fromEnv, toEnv)).tap(runCommands(commandsToRun, argv, commandObject), err => console.log(err)).tap(notify);
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
  let validCommands;
  if (!subCommands) {
    validCommands = commands;
  } else {
    subCommands = [].concat(subCommands);
    validCommands = _lodash2.default.pickBy(commands, (cmd, name) => _lodash2.default.includes(subCommands, name));
  }
  return _lodash2.default.map(validCommands, (command, name) => _lodash2.default.assign({}, command, { name: name }));
}

function checkRequirements(commands) {
  let requirements = _lodash2.default.map(_lodash2.default.values(commands), 'requirements');
  requirements = _lodash2.default.union(...requirements);
  return _bluebird2.default.all(requirements.map(fn => fn()));
}

function promptMissingConfig(answersFromConfig, fromEnv, toEnv) {
  return function (commands) {
    let prompts = _lodash2.default.map(_lodash2.default.values(commands), 'prompts');
    prompts = _lodash2.default.union(...prompts).map(function (prompt) {
      if (_lodash2.default.isFunction(prompt)) {
        return prompt(fromEnv, toEnv);
      }
      return prompt;
    }).filter(prompt => !_lodash2.default.has(answersFromConfig, prompt.name));
    return _inquirer2.default.prompt(prompts).then(answers => _lodash2.default.merge({}, answersFromConfig, answers));
  };
}

function runCommands(commands, argv, commandObject) {
  return function (answers) {
    let allRuns = _bluebird2.default.resolve();
    commands.forEach(function (command, commandIndex) {
      allRuns = allRuns.then(function () {
        const runMessage = command.runMessage || `Command ${commandObject.name}:${command.name}`;
        const spinner = (0, _ora2.default)(runMessage).start();
        if ((0, _log.is)('DEBUG')) {
          spinner.stopAndPersist({ symbol: '▶' });
        }
        return _bluebird2.default.resolve(command.run(answers, argv, spinner)).then(() => {
          spinner.succeed();
        }, e => {
          if (e instanceof _Errors.SubcommandSkip) {
            spinner.info();
            (0, _log2.default)(e.message);
          } else {
            spinner.fail();
            if (e instanceof _Errors.SubcommandError) {
              e.failedCommand = commandIndex;
            }
            throw e;
          }
        });
      });
    });
    return allRuns.catch(e => {
      if (e instanceof _Errors.SubcommandError) {
        (0, _log2.default)('Execution failed. The following commands were not executed:');
        const missingCommands = _lodash2.default.map(commands.slice(e.failedCommand, commands.length), 'name');
        missingCommands.forEach(command => (0, _log2.default)(`\tflynt ${commandObject.name} ${command}`));
        (0, _log2.default)('Do not forget to add the flags used to run the current command.');
        if (!(0, _log.is)('DEBUG')) {
          (0, _log2.default)('Run with `-v` flag to get more info.');
        }
      } else {
        throw e;
      }
    });
  };
}

function switchToRoot(force) {
  if (!force) {
    const rootPath = (0, _getRootPath2.default)();
    if (rootPath !== process.cwd()) {
      return _inquirer2.default.prompt([{
        type: 'confirm',
        name: 'switchToRoot',
        message: `Do you want to switch to ${rootPath} to execute the command?`,
        default: true
      }]).then(function (answers) {
        if (answers.switchToRoot) process.chdir(rootPath);
      });
    }
  }
  return _bluebird2.default.resolve();
}

function getWhenToSaveConfigIndex(commands) {
  for (const index in commands) {
    const command = commands[index];
    if (!command.notInRootFolder) {
      return index;
    }
  }
  return commands.length;
}

function notify() {
  notifier.echo();
}