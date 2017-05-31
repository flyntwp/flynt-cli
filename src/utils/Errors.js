export class SubcommandError extends Error {
  constructor (command) {
    const message = 'Subcommand failed'
    super(message)
    this.message = message
    this.command = command
    this.name = 'SubcommandError'
  }
}

export class SubcommandSkip extends Error {
  constructor (command, message) {
    super(message)
    this.message = message
    this.command = command
    this.name = 'SubcommandSkip'
  }
}
