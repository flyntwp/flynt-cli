'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = handleCommand;

var _config = require('./utils/config');

function handleCommand(commandObject, fromEnv, toEnv, subCommand) {
  return function (argv) {
    // return if subcommand was called but handler was registered to main command
    // in this case yarg first calls the handler for the subcommand and afterwards
    // for main.
    // however, this handler should only be executed once
    if (!subCommand && argv._.length !== 1) {
      return Promise.resolve();
    }
    fromEnv = resolveEnv(fromEnv, argv);
    toEnv = resolveEnv(toEnv, argv);

    var config = (0, _config.getConfig)(argv);
    var run = commandObject.run(subCommand, (0, _config.mapConfigToAnswers)(config, fromEnv, toEnv));
    return run.then((0, _config.saveConfig)(argv, config, argv.env));
  };
}

function resolveEnv(env, argv) {
  if (env && env.indexOf('argv.')) {
    return argv[env.replace('argv.', '')];
  } else {
    return env;
  }
}