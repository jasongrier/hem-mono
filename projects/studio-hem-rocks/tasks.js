const { spawn } = require('child_process')

function startMidi(isStartup) {
  if (!isStartup) return
  spawn('npm', ['start', 'midi'])
}

module.exports = [startMidi]
