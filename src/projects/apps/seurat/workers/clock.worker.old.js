const midi = require('midi')
const NanoTimer = require('nanotimer')

const MIDI_CODES = Object.freeze({
  START: 250,
  CONTINUE: 251,
  STOP: 252,
  PULSE: 248,
  NOTE_ON: 144,
  NOTE_OFF: 128,
  CC: 176,
})

const CLOCK_SOURCES = Object.freeze({
  INTERNAL: 0,
  EXTERNAL: 0,
})

const DEFAULTS = Object.freeze({
  ticksPerBeat: 48,
  midiPortName: 'HEM MIDI',
  clockSource: CLOCK_SOURCES.EXTERNAL,
})

let opts
let playing = false
let midiOutput
let tickCount = 1

const init = optsFromWorld => {
  opts = Object.assign({}, DEFAULTS, optsFromWorld)
  midiOutput = createVirtualMidiPortOutput(opts.midiPortName)
  createVirtualMidiPortInput(opts.midiPortName, evalLoop)
  if (opts.clockSource === CLOCK_SOURCES.INTERNAL) {
    startInternalClock()
  }
}

const clockDivider = () => {
  if (tickCount === 1) {
    if (playing) {
      tickCount ++

      try {
        process.send('beat')
      }

      catch(err) {}

      for (const id in windows) {
        if (windows.hasOwnProperty(id)) {
          windows[id].onBeat(id)
        }
      }
    }
  }

  else if (tickCount === opts.ticksPerBeat) {
    tickCount = 1
  }

  else {
    tickCount ++
  }
}

const timer = new NanoTimer()
const tempo = 20.833333333
const tempoString = tempo + 'm'
const startInternalClock = () => {
  timer.setInterval(() => {
    clockDivider()
  }, '', tempoString)
}

const evalLoop = (deltaTime, midiMessage) => {
  switch (midiMessage[0]) {
    case MIDI_CODES.START:
    case MIDI_CODES.CONTINUE:
      beatCount = 0
      ticks = 0
      process.send('startFromMidi')
      playing = true
      tickCount = 1
      break

    case MIDI_CODES.PULSE:
      if (opts.clockSource !== CLOCK_SOURCES.EXTERNAL) return
      clockDivider()
      break

    case MIDI_CODES.NOTE_ON:
      process.send({message: 'midiNoteOnReceived', data: midiMessage[1]})
      break

    case MIDI_CODES.NOTE_OFF:
      process.send({message: 'midiNoteOffReceived', data: midiMessage[1]})
      break

    case MIDI_CODES.STOP:
      process.send('stopFromMidi')
      playing = false
      break
  }
}

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

const start = () => {
  if (opts.clockSource === CLOCK_SOURCES.INTERNAL) {
    beatCount = 0
    ticks = 0
    midiOutput.sendMessage([MIDI_CODES.START])
  }
}

const stop = () => {
  if (opts.clockSource === CLOCK_SOURCES.INTERNAL) {
    midiOutput.sendMessage([MIDI_CODES.STOP])
  }
}

process.on('message', ({message, data}) => {
  switch (message) {
    case 'init':
      init()
      break
  }
})
