# Flynt CLI _(flynt-cli)_

[![standard-readme compliant](https://img.shields.io/badge/readme%20style-standard-brightgreen.svg?style=flat-square)](https://github.com/RichardLitt/standard-readme)

> CLI tool for the WordPress Flynt framework

## Table of Contents

- [Background](#background)
- [Install](#install)
- [Usage](#usage)
- [Maintainers](#maintainers)
- [Contribute](#contribute)
- [License](#license)

## Background

This CLI tool takes care of multiple tasks when working with the Flynt framework for WordPress.

It helps you create a new project based on Flynt, facilitates a multi-environment WordPress development setup and offers shortcuts for running external dependencies of the build process.

Theoretically only the `create` command is Flynt specific. All other tasks could be used with any WordPress project that uses `composer`, `yarn`, `gulp`, and optionally `bower`.

The `clone` and `deploy` commands are especially useful if you follow the proposed multi-environment development setup. This means a developer always works on his local environment and has everything running on his machine (i.e. Apache, MySQL, etc). In addition there is a 'public' development server. This server is the single point of truth for the local environment. While you can make any changes during development on your local environment, you should always do a `flynt clone` before you start working on something new, or when you want to revert your local changes. When you are done with a new feature, run `flynt build && flynt deploy` to publish the changes to the development server. The `deploy` command is just a wrapper for rsync, so that you do not need to remember the exact command yourself. You can also use `deploy` for other environments (e.g. staging or production) but it is recommended that you use a more sophisticated approach at least for production.

To use all features of the CLI there are a couple of OS dependencies. There are checks with feedback for all required binaries when you run a command.

The `create` command uses [Root's Bedrock](https://roots.io/bedrock/) composer package to set the foundation for a new Flynt project.

## Install

The initial installation only requires [node](https://nodejs.org) and [npm](https://npmjs.com). In order to be able to use all commands, the following is also required:

- [php](https://secure.php.net/)
- [mysql](https://www.mysql.com/)
- [composer](https://getcomposer.org/)
- [wp-cli](https://wp-cli.org/)
- [wp-cli dotenv](https://aaemnnost.tv/wp-cli-commands/dotenv/)
- [git](https://git-scm.com/)
- [yarn](https://yarnpkg.com/)
- [gulp](http://gulpjs.com/)
- [ssh, scp](https://www.openssh.com/)
- [rsync](https://rsync.samba.org/)

The used node version should be `^6`. If you use a node version manager (e.g. [nave](https://github.com/isaacs/nave)), use `npm` to install globally:

```bash
$ npm i -g @flyntwp/flynt-cli
```

Otherwise you can use yarn as well:

```bash
$ yarn global add @flyntwp/flynt-cli
```

## Usage

flynt-cli consists of several commands. A command is a collection of subcommands that are executed. If you do not specify a subcommand, all subcommands are executed in the pre-defined order. It is also possible to execute a single subcommand.

The `--help` flag displays a general help or help for a specific command, including all subcommands in the correct order.

By default almost all messages from the executed scripts are surpressed. To enable the verbose mode use the `-v` flag.

### CLI

```bash
$ flynt <command> [<subcommand>] [options]
```

To display instructions on how to use a certain command use

```bash
$ flynt [<command>] --help
```

## Maintainers

This project is maintained by [bleech](https://bleech.de).

Main people in charge of the repo are:

- [Dominik Tränklein](https://github.com/domtra)
- [Doğa Gürdal](https://github.com/Qakulukiam)

## Contribute

To contribute, please use github [issues](https://github.com/flyntwp/flynt-cli/issues). PRs accepted.

Small note: If editing the README, please conform to the [standard-readme](https://github.com/RichardLitt/standard-readme) specification.

## License

MIT © [bleech](https://bleech.de)
