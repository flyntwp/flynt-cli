import childProcess from 'child_process'
import path from 'path'
import Promise from 'bluebird'

import * as allPrompts from '../prompts'
import * as allRequirements from '../requirements'

export const requirements = [
  allRequirements.mysql,
  allRequirements.mysqldump,
  allRequirements.php,
  allRequirements.ssh,
  allRequirements.scp,
  allRequirements.sed
]

export const prompts = [
  allPrompts.basePath,
  allPrompts.dbHost,
  allPrompts.dbUser,
  allPrompts.dbName,
  allPrompts.dbPassword,
  allPrompts.sshHost,
  allPrompts.sshUser,
  allPrompts.sshPort,
  allPrompts.basePathRemote,
  allPrompts.dbHostRemote,
  allPrompts.dbUserRemote,
  allPrompts.dbNameRemote,
  allPrompts.dbPasswordRemote,
  allPrompts.sshHostRemote,
  allPrompts.sshUserRemote,
  allPrompts.sshPortRemote
]

export function run (answers) {
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

  const destinationBackupCmd = `mysqldump --host=${answers.dbHostRemote} -u${answers.dbUserRemote} -p${answers.dbPasswordRemote} ${answers.dbNameRemote} > ${answers.basePathRemote}/${backupDir}/backup_${Date.now()}.sql`
  if (destinationRemote) {
    cmds.push(`ssh ${answers.sshPortRemote ? `-p ${answers.sshPortRemote}` : ''} -t ${destinationSshId} 'mkdir -p ${answers.basePathRemote}/${backupDir} && mkdir -p ${answers.basePathRemote}/${tmpDir} && ${destinationBackupCmd}'`)
  } else {
    cmds.push(destinationBackupCmd)
  }

  const sourceDumpCmd = `mysqldump --host=${answers.dbHost} -u${answers.dbUser} -p${answers.dbPassword} ${answers.dbName} > ${answers.basePath}/${tmpDir}/${backupTransferFile}`
  if (sourceRemote) {
    cmds.push(`ssh ${answers.sshPort ? `-p ${answers.sshPort}` : ''} -t ${sourceSshId} 'mkdir -p ${answers.basePath}/${tmpDir} && ${sourceDumpCmd}'`)
  } else {
    cmds.push(sourceDumpCmd)
  }
  if (sourceRemote) {
    cmds.push(`scp ${answers.sshPort ? `-P ${answers.sshPort}` : ''} ${sourceSshId}:${answers.basePath}/${tmpDir}/${backupTransferFile} ${tmpDir}`)
  }
  cmds.push(`sed -i '' 's/DEFINER=[^*]*\\*/\\*/g' ${tmpDir}/${backupTransferFile}`)
  if (destinationRemote) {
    cmds.push(`scp ${answers.sshPortRemote ? `-P ${answers.sshPortRemote}` : ''} ${tmpDir}/${backupTransferFile} ${destinationSshId}:${answers.basePathRemote}/${tmpDir}`)
    cmds.push(`rm ${tmpDir}/${backupTransferFile}`)
  }
  if (sourceRemote) {
    cmds.push(`ssh ${answers.sshPort ? `-p ${answers.sshPort}` : ''} -t ${sourceSshId} 'rm ${answers.basePath}/${tmpDir}/${backupTransferFile}'`)
  }

  const destinationImportCmd = `mysql --host=${answers.dbHostRemote} -u${answers.dbNameRemote} -p${answers.dbPasswordRemote} ${answers.dbNameRemote} < ${answers.basePathRemote}/${tmpDir}/${backupTransferFile} && rm ${answers.basePathRemote}/${tmpDir}/${backupTransferFile}`
  if (destinationRemote) {
    cmds.push(`ssh ${answers.sshPortRemote ? `-p ${answers.sshPortRemote}` : ''} -t ${destinationSshId} '${destinationImportCmd}'`)
  } else {
    cmds.push(destinationImportCmd)
  }

  const srdbPath = require.resolve('search-replace-db')
  if (destinationRemote) {
    cmds.push(`scp -r ${answers.sshPortRemote ? `-P ${answers.sshPortRemote}` : ''} ${path.join(srdbPath, '..')} ${destinationSshId}:${answers.basePathRemote}/${tmpDir}`)
    const destinationReplaceCmd = `php ${path.join(answers.basePathRemote, tmpDir, 'search-replace-db', path.basename(srdbPath))} -h ${answers.dbHostRemote} -u ${answers.dbUserRemote} -p ${answers.dbPasswordRemote} -n ${answers.dbNameRemote} -s '${answers.wpHome}' -r '${answers.wpHomeRemote}'`
    cmds.push(`ssh ${answers.sshPortRemote ? `-p ${answers.sshPortRemote}` : ''} -t ${destinationSshId} '${destinationReplaceCmd}'`)
  } else {
    cmds.push(`php ${srdbPath} -h ${answers.dbHostRemote} -u ${answers.dbUserRemote} -p ${answers.dbPasswordRemote} -n ${answers.dbNameRemote} -s '${answers.wpHome}' -r '${answers.wpHomeRemote}'`)
  }

  return new Promise(function (resolve, reject) {
    let exec = childProcess.exec(cmds.join(' && '), function () {
      resolve()
    })
    exec.stdout.pipe(process.stdout)
    exec.stderr.pipe(process.stderr)
  })
}
