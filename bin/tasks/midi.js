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
  const hemMidiTunnelA = createVirtualMidiPortOutput('HEM MIDI Tunnel')

  createVirtualMidiPortInput('HEM MIDI Tunnel', (timestamp, msg) => {
    hemMidiTunnelA.sendMessage(msg)
  })
}

module.exports = startMidi
