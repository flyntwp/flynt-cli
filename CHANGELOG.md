# Change Log

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

<a name="0.2.0"></a>
# [0.2.0](https://github.com/flyntwp/flynt-cli/compare/v0.1.2...v0.2.0) (2018-04-18)


### Bug Fixes

* **create:** remove flynt core package from custom repos ([#77](https://github.com/flyntwp/flynt-cli/issues/77)) ([1a3548c](https://github.com/flyntwp/flynt-cli/commit/1a3548c))
* **create:** use .test instead of .dev for default local domain ([#74](https://github.com/flyntwp/flynt-cli/issues/74)) ([c58f9d6](https://github.com/flyntwp/flynt-cli/commit/c58f9d6))
* **create:** use https url for theme instead of ssh ([#78](https://github.com/flyntwp/flynt-cli/issues/78)) ([c3bc8f7](https://github.com/flyntwp/flynt-cli/commit/c3bc8f7))


### Code Refactoring

* **bower:** remove bower from create, install and upgrade tasks ([#76](https://github.com/flyntwp/flynt-cli/issues/76)) ([0f89a68](https://github.com/flyntwp/flynt-cli/commit/0f89a68))


### Features

* **create:** update composer php dependencies ([#75](https://github.com/flyntwp/flynt-cli/issues/75)) ([d7ff25b](https://github.com/flyntwp/flynt-cli/commit/d7ff25b))
* **dbConfig:** allow using different ports and sockets for db connections ([#70](https://github.com/flyntwp/flynt-cli/issues/70)) ([a610ae9](https://github.com/flyntwp/flynt-cli/commit/a610ae9))


### BREAKING CHANGES

* **bower:** Going forward, bower will not be supported by the flynt-cli anymore.



<a name="0.1.2"></a>
## [0.1.2](https://github.com/flyntwp/flynt-cli/compare/v0.1.1...v0.1.2) (2017-08-04)


### Bug Fixes

* **cloneDb:** use correct username for import (#63) ([835c254](https://github.com/flyntwp/flynt-cli/commit/835c254))


### Features

* **proxyCommands:** add simple version of proxy commands (#64) ([8f318a1](https://github.com/flyntwp/flynt-cli/commit/8f318a1))
* **readline:** use readline wrapper instead of stdout functions (#66) ([f700851](https://github.com/flyntwp/flynt-cli/commit/f700851))
* **verboseMode:** default to true (#65) ([d9ffa1f](https://github.com/flyntwp/flynt-cli/commit/d9ffa1f))



<a name="0.1.1"></a>
## [0.1.1](https://github.com/flyntwp/flynt-cli/compare/v0.1.0...v0.1.1) (2017-06-12)


### Bug Fixes

* **cloneDb:** display search replace mismatch in non-verbose mode (#56) ([998189b](https://github.com/flyntwp/flynt-cli/commit/998189b)), closes [#54](https://github.com/flyntwp/flynt-cli/issues/54)


### Features

* **version:** add --version flag (#55) ([79128d5](https://github.com/flyntwp/flynt-cli/commit/79128d5))



<a name="0.1.0"></a>
# 0.1.0 (2017-06-08)


### Bug Fixes

* **activateWordpress:** set default rewrite structure ([972a9bd](https://github.com/flyntwp/flynt-cli/commit/972a9bd))
* **clone:** add searchReplaceStrings to configFields again ([89be60a](https://github.com/flyntwp/flynt-cli/commit/89be60a))
* **cloneDb:** hardcode replace-in-file binary location ([06fcf6e](https://github.com/flyntwp/flynt-cli/commit/06fcf6e))
* **create:** initGitRepo at end of create ([7743e19](https://github.com/flyntwp/flynt-cli/commit/7743e19)), closes [#12](https://github.com/flyntwp/flynt-cli/issues/12)
* **create:** install yarn and bower packages explicitely ([c9c83c3](https://github.com/flyntwp/flynt-cli/commit/c9c83c3))
* **create:** only add acf pro and wpm pro keys to .env if given ([7124b7b](https://github.com/flyntwp/flynt-cli/commit/7124b7b))
* **deploy:** add exludes to rsync call ([6420981](https://github.com/flyntwp/flynt-cli/commit/6420981))
* **deploy:** adjust deployExcludes default value ([91577b9](https://github.com/flyntwp/flynt-cli/commit/91577b9))
* **deploy:** remove theme rsyncExcludes ([8b80ea4](https://github.com/flyntwp/flynt-cli/commit/8b80ea4))
* **deploy:** remove trailing slash from deploy src ([fb54d33](https://github.com/flyntwp/flynt-cli/commit/fb54d33))
* **deploy:** show correct help dialog ([250bdad](https://github.com/flyntwp/flynt-cli/commit/250bdad))
* **execCommand:** preserve colors for gulp (inherit stdio on spawn) ([4312143](https://github.com/flyntwp/flynt-cli/commit/4312143))
* **handleCommand:** correctly use answers from config ([54551e8](https://github.com/flyntwp/flynt-cli/commit/54551e8))
* **prompts:** filter prompt by name after prompt function was executed ([1f9fea8](https://github.com/flyntwp/flynt-cli/commit/1f9fea8))
* **requireComposerPackages:** do not add duplicates to composer.json (repos, mu-plugins) ([ecd42b4](https://github.com/flyntwp/flynt-cli/commit/ecd42b4))
* **setup:** add wp cli dotenv requirement to setupWordpress ([6f3b88c](https://github.com/flyntwp/flynt-cli/commit/6f3b88c))
* **setup:** quote wpTitle in setupWordpress command ([fb66440](https://github.com/flyntwp/flynt-cli/commit/fb66440))
* **utils/addLinesToFiles.js:** typo ([de636d1](https://github.com/flyntwp/flynt-cli/commit/de636d1))


### Features

* **.flynt.json:** add newline when writing file ([665441a](https://github.com/flyntwp/flynt-cli/commit/665441a)), closes [#29](https://github.com/flyntwp/flynt-cli/issues/29)
* **activateWordpress:** activate all plugins ([6c9d490](https://github.com/flyntwp/flynt-cli/commit/6c9d490))
* **activateWordpress:** flush rewrite rules and create .htaccess ([d4eaaa4](https://github.com/flyntwp/flynt-cli/commit/d4eaaa4))
* **adjustGitignore:** add /tmp/ and /backup/ to gitignore ([76becb9](https://github.com/flyntwp/flynt-cli/commit/76becb9)), closes [#1](https://github.com/flyntwp/flynt-cli/issues/1) [#2](https://github.com/flyntwp/flynt-cli/issues/2)
* **adjustGitignore:** remove web/.htaccess from .gitignore ([1168c61](https://github.com/flyntwp/flynt-cli/commit/1168c61))
* **bower:** add bower install and update subcommands ([7adf62f](https://github.com/flyntwp/flynt-cli/commit/7adf62f))
* **build:** add build command for building theme ([a5bfd1d](https://github.com/flyntwp/flynt-cli/commit/a5bfd1d))
* **buildArguments:** take options as argument and apply to main and subcommands ([28ffa92](https://github.com/flyntwp/flynt-cli/commit/28ffa92))
* **clone:** add clone db and clone uploads + logic to read and write config files with environments ([13694fc](https://github.com/flyntwp/flynt-cli/commit/13694fc))
* **clone:** add wp replace config ([74d64c1](https://github.com/flyntwp/flynt-cli/commit/74d64c1))
* **clone:** only replace basePath and wpHome on clone ([6b10c14](https://github.com/flyntwp/flynt-cli/commit/6b10c14))
* **cloneDb:** add prompt for additional search & replace strings ([8f4862e](https://github.com/flyntwp/flynt-cli/commit/8f4862e))
* **cloneDb:** use replaceInFile module instead of sed for db adjustments ([f7a7429](https://github.com/flyntwp/flynt-cli/commit/f7a7429))
* **commands:** add run messages to all commands ([989f98a](https://github.com/flyntwp/flynt-cli/commit/989f98a))
* **commands:** add verbose mode ([e78413f](https://github.com/flyntwp/flynt-cli/commit/e78413f))
* **config:** read and write config by default ([064356b](https://github.com/flyntwp/flynt-cli/commit/064356b))
* **config:** save answers to config as soon as possible ([b38842d](https://github.com/flyntwp/flynt-cli/commit/b38842d))
* **create:** add symlink to theme in root folder ([54454f1](https://github.com/flyntwp/flynt-cli/commit/54454f1)), closes [#49](https://github.com/flyntwp/flynt-cli/issues/49)
* **create:** build theme before activateWordpress ([8b11802](https://github.com/flyntwp/flynt-cli/commit/8b11802))
* **create:** improve package installation in installComposerPackages ([9b097b2](https://github.com/flyntwp/flynt-cli/commit/9b097b2))
* **create:** remove .env from .gitignore ([9a10088](https://github.com/flyntwp/flynt-cli/commit/9a10088))
* **create:** replace host and sourceRoot in gulp config file with project specific values ([2f9c019](https://github.com/flyntwp/flynt-cli/commit/2f9c019))
* **create:** set bedrock version to 1.7.4 on installBedrock subcommand ([4593531](https://github.com/flyntwp/flynt-cli/commit/4593531))
* **deploy:** add default deploy command ([1d99a2f](https://github.com/flyntwp/flynt-cli/commit/1d99a2f))
* **deploy:** add default rsyncFlag --delete + add dry-run option to deploy task ([06f4983](https://github.com/flyntwp/flynt-cli/commit/06f4983))
* **exec:** use spawn instead of exec and include fix for windows ([ee3aa83](https://github.com/flyntwp/flynt-cli/commit/ee3aa83))
* **force:** execute flynt commands in root folder unless force flag added ([b934fb2](https://github.com/flyntwp/flynt-cli/commit/b934fb2))
* **force:** prompt for using root path + alter root path find method ([3e95add](https://github.com/flyntwp/flynt-cli/commit/3e95add))
* **getRootPath:** only check for .flynt.json file to determine root path ([3722437](https://github.com/flyntwp/flynt-cli/commit/3722437))
* **help:** show help if no command specified ([31094ee](https://github.com/flyntwp/flynt-cli/commit/31094ee)), closes [#39](https://github.com/flyntwp/flynt-cli/issues/39)
* **install:** add install command for yarn and composer packages ([39def9d](https://github.com/flyntwp/flynt-cli/commit/39def9d))
* **installBedrock:** allow create in current directory ([ca16437](https://github.com/flyntwp/flynt-cli/commit/ca16437))
* **lint:** add standard and babel eslint + fix linting errors ([2b7b6e3](https://github.com/flyntwp/flynt-cli/commit/2b7b6e3))
* **notifier:** create notifier to show summary at the end of all commands ([23eed94](https://github.com/flyntwp/flynt-cli/commit/23eed94))
* **prompts:** add environment in env specific prompt messages ([75b476f](https://github.com/flyntwp/flynt-cli/commit/75b476f))
* **prompts:** use config values for default answers ([8bb9df5](https://github.com/flyntwp/flynt-cli/commit/8bb9df5))
* **requireComposerPackages:** add composer repos and packages prompts ([c7410fd](https://github.com/flyntwp/flynt-cli/commit/c7410fd))
* **requireComposerPackages:** remove WP Migrate DB Pro installation ([fc8f9ef](https://github.com/flyntwp/flynt-cli/commit/fc8f9ef))
* **setup:** activate wordpress ([e61dc24](https://github.com/flyntwp/flynt-cli/commit/e61dc24))
* **setup:** add install bower ([4a140c1](https://github.com/flyntwp/flynt-cli/commit/4a140c1))
* **setup:** add setup command for existing projects on new environment ([9ac4158](https://github.com/flyntwp/flynt-cli/commit/9ac4158))
* **setup:** create db + setup wordpress ([ed370ec](https://github.com/flyntwp/flynt-cli/commit/ed370ec))
* **setup:** createDb with long form mysql arguments for user and password ([9cd5654](https://github.com/flyntwp/flynt-cli/commit/9cd5654))
* **setup:** init git repo + basic setup command ([2e3be18](https://github.com/flyntwp/flynt-cli/commit/2e3be18))
* **setup:** installBedrock in current folder + saveConfig immediately after prompts ([439bcd1](https://github.com/flyntwp/flynt-cli/commit/439bcd1))
* **setup:** read from and write to config file ([3c2ff77](https://github.com/flyntwp/flynt-cli/commit/3c2ff77))
* **setup:** require composer packages ([fe75f77](https://github.com/flyntwp/flynt-cli/commit/fe75f77))
* **setup:** setup theme ([f048e56](https://github.com/flyntwp/flynt-cli/commit/f048e56))
* **startYarn:** clear previous spinner line on browserSync output ([fc1da86](https://github.com/flyntwp/flynt-cli/commit/fc1da86))
* **startYarn:** display more gulp output in non-verbose mode ([3451c71](https://github.com/flyntwp/flynt-cli/commit/3451c71))
* **startYarn:** display startup message and switch to watching message ([97a8ddc](https://github.com/flyntwp/flynt-cli/commit/97a8ddc))
* **startYarn:** show browserSync messages in non verbose mode ([cedac6d](https://github.com/flyntwp/flynt-cli/commit/cedac6d))
* **theme:** add themeName prompt and do not use projectName for theme related tasks ([c8e8c84](https://github.com/flyntwp/flynt-cli/commit/c8e8c84))
* **upgrade:** add upgrade command for yarn upgrade and composer update ([b2ae718](https://github.com/flyntwp/flynt-cli/commit/b2ae718))
* **usage:** add group for command specific options ([1542db2](https://github.com/flyntwp/flynt-cli/commit/1542db2))
* **watch:** add watch command for running dev workflow ([371e8cf](https://github.com/flyntwp/flynt-cli/commit/371e8cf))
* **yarnStart:** remove unneeded log import ([f1bb2a6](https://github.com/flyntwp/flynt-cli/commit/f1bb2a6))
