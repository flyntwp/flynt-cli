import isString from 'lodash/isString'

let currentLevel = 0

export const levels = {
  LOG: 0,
  WARN: 1,
  INFO: 2,
  DEBUG: 3
}

export default function log (message, level = 0) {
  level = convertLevel(level)
  const logMethods = [
    'log',
    'warn',
    'info',
    'log'
  ]
  if (level <= currentLevel) {
    console[logMethods[level]](message)
  }
}

export function setLevel (level) {
  currentLevel = convertLevel(level)
  return getLevel
}

export function getLevel () {
  return currentLevel
}

export function is (level) {
  level = convertLevel(level)
  if (level <= currentLevel) {
    return true
  }
  return false
}

function convertLevel (level) {
  if (isString(level)) {
    return levels[level]
  }
  return level
}
