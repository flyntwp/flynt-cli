import exec from '../utils/executeCommand'
import path from 'path'

import * as allPrompts from '../prompts'
import * as allRequirements from '../requirements'

export const requirements = [
  allRequirements.rsync
]

export const prompts = [
  allPrompts.sshHost,
  allPrompts.sshUser,
  allPrompts.sshPort,
  allPrompts.basePath,
  allPrompts.deployPath,
  allPrompts.sshHostRemote,
  allPrompts.sshUserRemote,
  allPrompts.sshPortRemote,
  allPrompts.basePathRemote,
  allPrompts.deployPathRemote,
  allPrompts.deployExcludes,
  allPrompts.rsyncFlags
]

export function run (answers, argv) {
  let rsyncFlags = answers.rsyncFlags || ''
  if (argv.dryRun) rsyncFlags += ' --dry-run'
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

  let source = path.normalize(`${answers.basePath}/${answers.deployPath}`).replace(/\/$/, '')
  if (sourceRemote) {
    source = `${sourceSshId}:${source}`
  }
  let destination = path.normalize(`${answers.basePathRemote}/${answers.deployPathRemote}/`)
  if (destinationRemote) {
    destination = `${destinationSshId}:${destination}`
  }

  const excludes = answers.deployExcludes.map((exclude) => `--exclude=${exclude}`)
  .join(' ')
  if (destinationRemote && sourceRemote) {
    const tmpDir = './tmp/flynt-cli/deploy'
    cmds.push(`mkdir -p ${tmpDir}`)
    const sshCmdSource = answers.sshPort ? `-e "ssh -p ${answers.sshPort}"` : ''
    const sshCmdDestination = answers.sshPortRemote ? `-e "ssh -p ${answers.sshPortRemote}"` : ''
    cmds.push(`rsync ${rsyncFlags} ${excludes} ${sshCmdSource} ${source} ${tmpDir}`)
    cmds.push(`rsync ${rsyncFlags} ${excludes} ${sshCmdDestination} ${tmpDir} ${destination}`)
    cmds.push(`rm -rf ${tmpDir}`)
  } else {
    const sshCmd = sourceRemote
      ? answers.sshPort
        ? `-e "ssh -p ${answers.sshPort}"`
        : ''
      : answers.sshPortRemote
        ? `-e "ssh -p ${answers.sshPortRemote}"`
        : ''
    cmds.push(`rsync ${rsyncFlags} ${excludes} ${sshCmd} ${source} ${destination}`)
  }
  return exec(cmds)
}
