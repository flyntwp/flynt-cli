'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
class SubcommandError extends Error {
  constructor(command) {
    const message = 'Subcommand failed';
    super(message);
    this.message = message;
    this.command = command;
    this.name = 'SubcommandError';
  }
}

exports.SubcommandError = SubcommandError;
class SubcommandSkip extends Error {
  constructor(command, message) {
    super(message);
    this.message = message;
    this.command = command;
    this.name = 'SubcommandSkip';
  }
}
exports.SubcommandSkip = SubcommandSkip;