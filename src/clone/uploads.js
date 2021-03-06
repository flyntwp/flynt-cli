import exec from '../utils/executeCommand'

import * as allPrompts from '../prompts'
import * as allRequirements from '../requirements'

export const description = 'clone media files between environments'

export const runMessage = 'Cloning uploads...'

export const requirements = [
  allRequirements.rsync
]

export const prompts = [
  allPrompts.basePath,
  allPrompts.uploadsPath,
  allPrompts.dbHost,
  allPrompts.dbUser,
  allPrompts.dbName,
  allPrompts.dbPassword,
  allPrompts.sshHost,
  allPrompts.sshUser,
  allPrompts.sshPort,
  allPrompts.basePathRemote,
  allPrompts.uploadsPathRemote,
  allPrompts.dbHostRemote,
  allPrompts.dbUserRemote,
  allPrompts.dbNameRemote,
  allPrompts.dbPasswordRemote,
  allPrompts.sshHostRemote,
  allPrompts.sshUserRemote,
  allPrompts.sshPortRemote
]

export function run (answers) {
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
  let cmds = []

  let source = `${answers.basePath}/${answers.uploadsPath}/`
  if (sourceRemote) {
    source = `${sourceSshId}:${source}`
  }
  let destination = `${answers.basePathRemote}/${answers.uploadsPathRemote}/`
  if (destinationRemote) {
    destination = `${destinationSshId}:${destination}`
  }

  if (destinationRemote && sourceRemote) {
    const tmpDir = './tmp/flynt-cli/uploads'
    cmds.push(`mkdir -p ${tmpDir}`)
    const sshCmdSource = answers.sshPort ? `-e "ssh -p ${answers.sshPort}"` : ''
    const sshCmdDestination = answers.sshPortRemote ? `-e "ssh -p ${answers.sshPortRemote}"` : ''
    cmds.push(`rsync -chavzP --stats ${sshCmdSource} ${source} ${tmpDir}`)
    cmds.push(`rsync -chavzP --stats ${sshCmdDestination} ${tmpDir} ${destination}`)
    cmds.push(`rm -rf ${tmpDir}`)
  } else {
    const sshCmd = sourceRemote
      ? answers.sshPort
        ? `-e "ssh -p ${answers.sshPort}"`
        : ''
      : answers.sshPortRemote
        ? `-e "ssh -p ${answers.sshPortRemote}"`
        : ''
    cmds.push(`rsync -chavzP --stats ${sshCmd} ${source} ${destination}`)
  }

  return exec(cmds)
}
