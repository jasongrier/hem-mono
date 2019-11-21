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

function startMidiServer() {
  const dawHemOutput = createVirtualMidiPortOutput('A) HEM MIDI Tunnel: DAW -> HEM')
  createVirtualMidiPortInput('B) HEM MIDI Tunnel: DAW -> HEM', (timestamp, msg) => {
    dawHemOutput.sendMessage(msg)
  })

  const hemDawOutput = createVirtualMidiPortOutput('C) HEM MIDI Tunnel: HEM -> DAW')
  createVirtualMidiPortInput('D) HEM MIDI Tunnel: HEM -> DAW', (timestamp, msg) => {
    hemDawOutput.sendMessage(msg)
  })
}

module.exports = {
  createVirtualMidiPortInput,
  createVirtualMidiPortOutput,
  startMidiServer,
}
