import midi from 'midi'

export class VirtualMidi {
  constructor(name, onMessage) {
    // TODO: Throw if instantiated from main process or renderer process
    this._createVirtualMidiPortInput(name, onMessage)
    this._createVirtualMidiPortOutput(name)
  }

  _createVirtualMidiPortInput = (name, onMessage) => {
    const inputName = `${name} Input`
    const input = new midi.input()
    input.ignoreTypes(true, false, true)
    input.openVirtualPort(inputName)
    input.on('message', onMessage)
    console.log(`${inputName} created.`)
    this.in = input
  }

  _createVirtualMidiPortOutput = (name) => {
    const outputName = `${name} Output`
    const output = new midi.output()
    output.openVirtualPort(outputName)
    console.log(`${outputName} created.`)
    this.out = output
  }
}
