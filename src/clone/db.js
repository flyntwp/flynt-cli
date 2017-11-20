import exec from '../utils/executeCommand'
import path from 'path'
import unionWith from 'lodash/unionWith'
import isEqual from 'lodash/isEqual'
import {error} from '../utils/log'

import * as allPrompts from '../prompts'
import * as allRequirements from '../requirements'

export const description = 'clone database content between environments'

export const runMessage = 'Cloning database...'

export const requirements = [
  allRequirements.mysql,
  allRequirements.mysqldump,
  allRequirements.php,
  allRequirements.ssh,
  allRequirements.scp
]

export const prompts = [
  allPrompts.basePath,
  allPrompts.basePathRemote,
  allPrompts.wpHome,
  allPrompts.wpHomeRemote,
  allPrompts.searchReplaceStrings,
  allPrompts.searchReplaceStringsRemote,
  allPrompts.sshHost,
  allPrompts.sshUser,
  allPrompts.sshPort,
  allPrompts.dbHost,
  allPrompts.dbUser,
  allPrompts.dbName,
  allPrompts.dbPassword,
  allPrompts.dbPort,
  allPrompts.dbSocket,
  allPrompts.sshHostRemote,
  allPrompts.sshUserRemote,
  allPrompts.sshPortRemote,
  allPrompts.dbHostRemote,
  allPrompts.dbUserRemote,
  allPrompts.dbNameRemote,
  allPrompts.dbPasswordRemote,
  allPrompts.dbPortRemote,
  allPrompts.dbSocketRemote
]

export function run (answers) {
  if (answers.searchReplaceStrings.length !== answers.searchReplaceStringsRemote.length) {
    const cmds = [
      'exit 1'
    ]
    error('Error in cloneDb. Number of search and replace strings do not match.')
    return exec(cmds)
  }
  const tmpDir = './tmp/flynt-cli'
  const backupDir = './backup'
  const backupTransferFile = 'tmp_backup.sql'
  let sourceRemote, sourceSshId, destinationRemote, destinationSshId
  if (answers.sshHost) {
    sourceRemote = true
    sourceSshId = answers.sshHost
    if (answers.sshUser) sourceSshId = `${answers.sshUser}@${sourceSshId}`
  }
  if (answers.sshHostRemote) {
    destinationRemote = true
    destinationSshId = answers.sshHostRemote
    if (answers.sshUserRemote) destinationSshId = `${answers.sshUserRemote}@${destinationSshId}`
  }
  let cmds = [
    `mkdir -p ${tmpDir}`,
    `mkdir -p ${backupDir}`
  ]

  const destinationBackupCmd = `mysqldump --host=${answers.dbHostRemote} -u${answers.dbUserRemote} -p${answers.dbPasswordRemote} ${answers.dbPortRemote ? `--port ${answers.dbPortRemote}` : ''} ${answers.dbSocketRemote ? `--socket ${answers.dbSocketRemote}` : ''} ${answers.dbNameRemote} > ${answers.basePathRemote}/${backupDir}/backup_${Date.now()}.sql`
  if (destinationRemote) {
    cmds.push(`ssh ${answers.sshPortRemote ? `-p ${answers.sshPortRemote}` : ''} -t ${destinationSshId} 'mkdir -p ${answers.basePathRemote}/${backupDir} && mkdir -p ${answers.basePathRemote}/${tmpDir} && ${destinationBackupCmd}'`)
  } else {
    cmds.push(destinationBackupCmd)
  }

  const sourceDumpCmd = `mysqldump --host=${answers.dbHost} -u${answers.dbUser} -p${answers.dbPassword} ${answers.dbPort ? `--port ${answers.dbPort}` : ''} ${answers.dbSocket ? `--socket ${answers.dbSocket}` : ''} ${answers.dbName} > ${answers.basePath}/${tmpDir}/${backupTransferFile}`
  if (sourceRemote) {
    cmds.push(`ssh ${answers.sshPort ? `-p ${answers.sshPort}` : ''} -t ${sourceSshId} 'mkdir -p ${answers.basePath}/${tmpDir} && ${sourceDumpCmd}'`)
  } else {
    cmds.push(sourceDumpCmd)
  }
  if (sourceRemote) {
    cmds.push(`scp ${answers.sshPort ? `-P ${answers.sshPort}` : ''} ${sourceSshId}:${answers.basePath}/${tmpDir}/${backupTransferFile} ${tmpDir}`)
  }
  const replaceInFilePath = getReplaceInFilePath()
  cmds.push(`${replaceInFilePath} '/DEFINER=[^*]*\\\\*/g' '' ${tmpDir}/${backupTransferFile} --isRegex`)
  if (destinationRemote) {
    cmds.push(`scp ${answers.sshPortRemote ? `-P ${answers.sshPortRemote}` : ''} ${tmpDir}/${backupTransferFile} ${destinationSshId}:${answers.basePathRemote}/${tmpDir}`)
    cmds.push(`rm ${tmpDir}/${backupTransferFile}`)
  }
  if (sourceRemote) {
    cmds.push(`ssh ${answers.sshPort ? `-p ${answers.sshPort}` : ''} -t ${sourceSshId} 'rm ${answers.basePath}/${tmpDir}/${backupTransferFile}'`)
  }

  const destinationImportCmd = `mysql --host=${answers.dbHostRemote} -u${answers.dbUserRemote} -p${answers.dbPasswordRemote} ${answers.dbPortRemote ? `--port ${answers.dbPortRemote}` : ''} ${answers.dbSocketRemote ? `--socket ${answers.dbSocketRemote}` : ''} ${answers.dbNameRemote} < ${answers.basePathRemote}/${tmpDir}/${backupTransferFile} && rm ${answers.basePathRemote}/${tmpDir}/${backupTransferFile}`
  if (destinationRemote) {
    cmds.push(`ssh ${answers.sshPortRemote ? `-p ${answers.sshPortRemote}` : ''} -t ${destinationSshId} '${destinationImportCmd}'`)
  } else {
    cmds.push(destinationImportCmd)
  }

  const searchStrings = unionWith([
    answers.wpHome,
    path.resolve(answers.basePath)
  ], answers.searchReplaceStrings, isEqual)
  const replaceStrings = unionWith([
    answers.wpHomeRemote,
    path.resolve(answers.basePathRemote)
  ], answers.searchReplaceStringsRemote, isEqual)

  const srdbPath = require.resolve('search-replace-db')
  if (destinationRemote) {
    cmds.push(`scp -r ${answers.sshPortRemote ? `-P ${answers.sshPortRemote}` : ''} ${path.join(srdbPath, '..')} ${destinationSshId}:${answers.basePathRemote}/${tmpDir}`)
    searchStrings.forEach(function (searchString, i) {
      const replaceString = replaceStrings[i]
      const destinationReplaceCmd = `php ${path.join(answers.basePathRemote, tmpDir, 'search-replace-db', path.basename(srdbPath))} -h ${answers.dbHostRemote} -u ${answers.dbUserRemote} -p ${answers.dbPasswordRemote} ${answers.dbPortRemote ? `--port ${answers.dbPortRemote}` : ''} ${answers.dbSocketRemote ? `--socket ${answers.dbSocketRemote}` : ''} -n ${answers.dbNameRemote} -s '${searchString}' -r '${replaceString}'`
      cmds.push(`ssh ${answers.sshPortRemote ? `-p ${answers.sshPortRemote}` : ''} -t ${destinationSshId} '${destinationReplaceCmd}'`)
    })
  } else {
    searchStrings.forEach(function (searchString, i) {
      const replaceString = replaceStrings[i]
      cmds.push(`php ${srdbPath} -h ${answers.dbHostRemote} -u ${answers.dbUserRemote} -p ${answers.dbPasswordRemote} -n ${answers.dbNameRemote} -s '${searchString}' -r '${replaceString}'`)
    })
  }

  return exec(cmds)
}

function getReplaceInFilePath () {
  const moduleMainPath = require.resolve('replace-in-file')
  const modulePath = path.dirname(moduleMainPath)
  return path.join(modulePath, 'bin', 'cli.js')
}
