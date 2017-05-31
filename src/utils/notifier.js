import log from './log'
const data = []

export function addData (singleData) {
  data.push(singleData)
}

export function echo () {
  if (data.length) {
    log('\nSummary:\n')
    log(toString())
    clear()
  }
}

function toString () {
  return data.join('\n')
}

function clear () {
  data.length = 0
}
