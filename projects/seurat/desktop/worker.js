// ================================================================================
// Imports
// ================================================================================
const {compact, map, identity, merge, isArray, sample, filter} = require('lodash')
const midi = require('midi')
const ipc = require('node-ipc')
const NanoTimer = require('nanotimer')

// ================================================================================
// Constants
// ================================================================================
const MidiCodes = {
  START: 250,
  CONTINUE: 251,
  STOP: 252,
  PULSE: 248,
}

const pulsesPerBeat = 6

// ================================================================================
// State
// ================================================================================
let board = null
let playing = false // TODO: Duplicated in React state.
let beatCount = 0
let isStartingNote = true

// ================================================================================
// Utils
// ================================================================================
const threshold = (threshold, magnitude = 1) => {
  return threshold === 1 || Math.random() * magnitude < threshold
}

const clockDivider = () => {
  if (beatCount === 1) {
    beatCount ++
    playNotes()
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
      noteOutput.sendMessage([MidiCodes.PULSE])
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
// Note-picking Algorithms
// ================================================================================
let sequencePosition = 1
let ticks = 0
let performanceData = {
  boardSize: null,
  density: null,
  notes: null,
  sequence: null,
  throttle: null,
}

const playNotes = () => {
  if (!playing || compact(map(performanceData, identity)).length < Object.keys(performanceData).length) {
    return
  }

  const {boardSize, density, notes, sequence, throttle} = performanceData

  ticks = ticks < Math.floor(density * 16) ? ticks + 1 : 1

  if (ticks > 1) {
    return
  }

  let notesToPlay = []

  if (sequence === 'random') {
    const randomNote = sample(filter(notes, 'active'))
    randomNote && notesToPlay.push(randomNote)
  }

  else if (sequence === 'up') {
    let nextNote = find(notes, note => note.active && note.noteNumber > sequencePosition)

    if (!nextNote) {
      nextNote = find(notes, note => note.active && note.noteNumber > 0)
    }

    if (nextNote) {
      notesToPlay.push(nextNote)
      sequencePosition = findIndex(notes, {noteNumber: nextNote.noteNumber}) + 1
      sequencePosition = sequencePosition > boardSize ? 0 : sequencePosition
    }
  }

  else if (sequence === 'down') {
    let nextNote = findLast(notes, note => note.active && note.noteNumber < sequencePosition + 2)

    if (!nextNote) {
      nextNote = findLast(notes, note => note.active && note.noteNumber < boardSize + 1)
    }

    if (nextNote) {
      notesToPlay.push(nextNote)
      sequencePosition = findIndex(notes, {noteNumber: nextNote.noteNumber}) - 1
      sequencePosition = sequencePosition < 0 ? boardSize : sequencePosition
    }
  }

  else if (sequence === 'scan' || sequence === 'drum-machine') {
    const sideSize = Math.sqrt(boardSize)
    let i = 0
    for (let r = 0; r <= sideSize; r ++) {
      if (r > 0) {
        i = i - 1
      }

      for (let c = 0; c <= sideSize; c ++) {
        if (c === sequencePosition) {
          let noteToPush
          if (sequence === 'scan') {
            noteToPush = notes[i]
          }

          else if (sequence === 'drum-machine') {
            noteToPush = notes[i] && {noteNumber: r, active: notes[i].active, dotIndex: notes[i].dotIndex}
          }

          noteToPush && noteToPush.active && notesToPlay.push(noteToPush)
        }

        i ++
      }
    }

    sequencePosition = sequencePosition < sideSize - 1 ? sequencePosition + 1 : 0
  }

  for (const note of notesToPlay) {
    if (threshold(throttle)) {
      playNote(note)
    }
  }
}

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
      ipcConnected && ipc.of.world.emit('startFromMidi')
      break

    case MidiCodes.PULSE:
      clockDividerMidiClock()
      break

    case MidiCodes.STOP:
      playing = false
      ipcConnected && ipc.of.world.emit('stopFromMidi')
      break
  }
}

const noteOutput = createVirtualMidiPortOutput('Seurat Note Out')

createVirtualMidiPortInput('Seurat Note In', evalLoop)

const start = () => {
  if (CLOCK_SOURCE === 0) {
    beatCount = 0
    ticks = 0
    playing = true
    playNotes()
    noteOutput.sendMessage([MidiCodes.START])
  }
}

const stop = () => {
  if (CLOCK_SOURCE === 0) {
    playing = false
    isStartingNote = true
    noteOutput.sendMessage([MidiCodes.STOP])
  }
}

const playNote = (note) => {
  if (!note) {
    return
  }

  const {noteNumber, dotIndex} = note

  if (CLOCK_SOURCE === 0 && !isStartingNote) {
    timer.setTimeout(function () {
      noteOutput.sendMessage([144, noteNumber, 127])
      noteOutput.sendMessage([144, noteNumber, 0])
    }, '', '70m')
  }

  else {
    noteOutput.sendMessage([144, noteNumber, 127])
    noteOutput.sendMessage([144, noteNumber, 0])
    isStartingNote = false
  }

  ipcConnected && ipc.of.world.emit('flashDot', dotIndex)
}

// ================================================================================
// IPC
// ================================================================================
let ipcConnected = false

ipc.config.id = 'hello'
ipc.config.retry = 1000

ipc.connectTo('world', () => {
  ipc.of.world.on('connect', () => {ipcConnected = true; ipc.of.world.emit('connected')})
  ipc.of.world.on('start', start)
  ipc.of.world.on('stop', stop)
  ipc.of.world.on('performanceData', data => performanceData = merge(performanceData, data))
  ipc.of.world.on('onStateChange', state => board = state.board)
})