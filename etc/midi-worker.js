// ================================================================================
// Imports
// ================================================================================
const midi = require('midi')
const ipc = require('node-ipc')
const NanoTimer = require('nanotimer')

// ================================================================================
// Constants
// ================================================================================
const MidiCodes = {
  CONTINUE: 251,
  CONTROL_CHANGE: 176,
  NOTE_OFF: 128,
  NOTE_ON: 144,
  PULSE: 248,
  START: 250,
  STOP: 252,
}

const pulsesPerBeat = 6

// ================================================================================
// State
// ================================================================================
let beatCount = 0
let ipcConnected = false
let noteOutput
let playing = false

// ================================================================================
// Utils
// ================================================================================
const clockDivider = () => {
  if (beatCount === 1) {
    beatCount ++
  }

  else if (beatCount === pulsesPerBeat) {
    beatCount = 1
  }

  else {
    beatCount ++
  }
}

// ================================================================================
// Switch Clock Sources
// ================================================================================
let CLOCK_SOURCE = 0

const clockDividerInternalClock = () => {
  if (CLOCK_SOURCE === 0) {
    clockDivider()

    if (playing) {
      noteOutput.sendMessage([ MidiCodes.PULSE ])
    }
  }
}

const clockDividerMidiClock = () => {
  if (CLOCK_SOURCE === 1) {
    clockDivider()
  }
}

// ================================================================================
// Internal Clock
// ================================================================================
const timer = new NanoTimer()
const tempo = 20.833333333
const tempoString = tempo + 'm'
timer.setInterval(clockDividerInternalClock, '', tempoString)

// ================================================================================
// I/O
// ================================================================================
const createVirtualMidiPortInput = (name, onMessage) => {
  const inputName = `${name} Input`
  const input = new midi.input()
  input.ignoreTypes(true, false, true)
  input.openVirtualPort(inputName)
  input.on('message', onMessage)
  console.log(`${inputName} created.`)
  return input
}

const createVirtualMidiPortOutput = (name) => {
  const outputName = `${name} Output`
  const output = new midi.output()
  output.openVirtualPort(outputName)
  console.log(`${outputName} created.`)
  return output
}

const evalLoop = (deltaTime, message) => {
  switch (message[0]) {
    case MidiCodes.START:
    case MidiCodes.CONTINUE:
      playing = true
      beatCount = 0
      ticks = 0
      ipcConnected && ipc.of.world.emit('START_FROM_MIDI')
      break

    case MidiCodes.PULSE:
      clockDividerMidiClock()
      break

    case MidiCodes.STOP:
      playing = false
      ipcConnected && ipc.of.world.emit('STOP_FROM_MIDI')
      break
  }
}

// ================================================================================
// Actions
// ================================================================================
const createMidiPorts = (name) => {
  noteOutput = createVirtualMidiPortOutput(name + ' Note Out')
  createVirtualMidiPortInput(name + ' Note In', evalLoop)
}

const playNote = (noteNumber) => {
  noteOutput.sendMessage([ MidiCodes.NOTE_ON, noteNumber, 127 ])
  noteOutput.sendMessage([ MidiCodes.NOTE_OFF, noteNumber, 0 ])
}

const sendControl = ({ controlNumber, value }) => {
  noteOutput.sendMessage([ MidiCodes.NOTE_ON, controlNumber, value ])
}

const setClockSource = (clockSource) => {
  CLOCK_SOURCE = clockSource
}

const start = () => {
  beatCount = 0
  ticks = 0
  playing = true
  noteOutput.sendMessage([ MidiCodes.START ])
}

const stop = () => {
  playing = false
  noteOutput.sendMessage([ MidiCodes.STOP ])
}

// ================================================================================
// IPC
// ================================================================================
ipc.config.id = 'hello'
ipc.config.retry = 1000

ipc.connectTo('world', () => {
  ipc.of.world.on('connect', () => {
    ipcConnected = true
    ipc.of.world.emit('connected')
  })

  ipc.of.world.on('CREATE_MIDI_PORTS', createMidiPorts)
  ipc.of.world.on('PLAY_NOTE', playNote)
  ipc.of.world.on('SEND_CONTROL', sendControl)
  ipc.of.world.on('SET_CLOCK_SOURCE', setClockSource)
  ipc.of.world.on('START_PLAYING', start)
  ipc.of.world.on('STOP_PLAYING', stop)
})
