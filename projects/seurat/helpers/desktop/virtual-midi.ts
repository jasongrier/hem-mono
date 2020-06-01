import * as midi from 'midi'

type MidiMessage = [number, number, number]

enum MidiTimingCodes {
  START = 250,
  CONTINUE = 251,
  STOP = 252,
  PULSE = 248,
}

interface IOnMessageHandler {
  (deltaTime: number, message: MidiMessage): void
}

interface IMidiVirtualInput {
  ignoreTypes: (sysex: boolean, timing: boolean, activeSensing: boolean) => void
  openVirtualPort: (inputName: string) => void
  on: (type: string, handler: IOnMessageHandler) => void
}

interface IMidiVirtualOutput {
  openVirtualPort: (inputName: string) => void
  sendMessage: (message: MidiMessage) => void
}


const createVirtualMidiPortInput = (name: string, onMessage: IOnMessageHandler): IMidiVirtualInput => {
  const inputName = `${name} Input`
  const input: IMidiVirtualInput = new midi.input()
  input.ignoreTypes(true, false, true)
  input.openVirtualPort(inputName)
  input.on('message', onMessage)
  console.log(`${inputName} created.`)
  return input
}

const createVirtualMidiPortOutput = (name: string): IMidiVirtualOutput => {
  const outputName = `${name} Output`
  const output: IMidiVirtualOutput = new midi.output()
  output.openVirtualPort(outputName)
  console.log(`${outputName} created.`)
  return output
}

export {
  MidiMessage,
  MidiTimingCodes,
  IOnMessageHandler,
  IMidiVirtualInput,
  IMidiVirtualOutput,
  createVirtualMidiPortInput,
  createVirtualMidiPortOutput,
}