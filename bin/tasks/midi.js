const midi = require('midi')

function createVirtualMidiPortInput(name, onMessage) {
  const inputName = `${name} Input`
  const input = new midi.input()
  input.ignoreTypes(true, false, true)
  input.openVirtualPort(inputName)
  input.on('message', onMessage)
  console.log(`${inputName} created.`)
  return input
}

function createVirtualMidiPortOutput(name) {
  const outputName = `${name} Output`
  const output = new midi.output()
  output.openVirtualPort(outputName)
  console.log(`${outputName} created.`)
  return output
}

function startMidi() {
  const dawHemOutput = createVirtualMidiPortOutput('HEM MIDI Tunnel: A')
  createVirtualMidiPortInput('HEM MIDI Tunnel: B', (timestamp, msg) => {
    dawHemOutput.sendMessage(msg)
  })

  const hemDawOutput = createVirtualMidiPortOutput('HEM MIDI Tunnel: C')
  createVirtualMidiPortInput('HEM MIDI Tunnel: D', (timestamp, msg) => {
    hemDawOutput.sendMessage(msg)
  })
}

module.exports = startMidi
