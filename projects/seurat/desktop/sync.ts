import {triggerRenderer, triggerRendererHandler, addRendererAppUtil} from 'projekt/lib/helpers/desktop'
import {IBoard} from 'projekt/projects/seurat-pm/model'
import {fork} from 'child_process'
import * as ipc from 'node-ipc'

let socket

const initWorker = () => {
  ipc.config.id = 'world'
  ipc.config.retry = 1500
  ipc.serve(() => {
    ipc.server.on('connected', (d, s) => socket = s)
    ipc.server.on('startFromMidi', triggerRendererHandler('setPlaying', true))
    ipc.server.on('stopFromMidi', triggerRendererHandler('setPlaying', false))
    ipc.server.on('flashDot', dotId => triggerRenderer('flashDot', dotId))
  })
  ipc.server.start()

  const path = '/Users/tony/Desktop/HEM18/Current/Projekt/react-projekt/projects/seurat-pm/desktop/workers/transport.js'
  const params = []
  const opts = {stdio: [0, 1, 2, 'ipc']}
  fork(path, params, opts)
}

const start = () => {
  try {
    triggerRenderer('setPlaying', true)
    socket && ipc.server.emit(socket, 'start')
  }

  catch (err) {
    console.log('Worker not ready error 1.', err)
  }
}

const stop = () => {
  try {
    triggerRenderer('setPlaying', false)
    socket && ipc.server.emit(socket, 'stop')
    // resetNotesModule()
  }

  catch (err) {
    console.log('Worker not ready error 2.', err)
  }
}

const dotsToNotes = (dots: boolean[]) => {
  const notes = {}

  for (const dotIndex in dots) {
    if (dots.hasOwnProperty(dotIndex)) {
      notes[dotIndex] = dotToNote(dotIndex, notes[dotIndex])
    }
  }

  return notes
}

const dotToNote = (dotIndex: string, active: boolean) => ({dotIndex, active, noteNumber: parseInt(dotIndex) + 1})

const setBoard = (board: IBoard) => {
  try {
    ipc.server.emit(socket, 'performanceData', {
      notes: dotsToNotes(board.dots),
      boardSize: board.size,
      sequence: board.sequence,
      density: board.sliders[0],
      throttle: board.sliders[1],
    })
  }

  catch (err) {
    console.log('Worker not ready error 3.', err)
  }
}

const setNote = (dotIndex: string, active: boolean) => {
  try {
    ipc.server.emit(socket, 'setNote', dotToNote(dotIndex, active))
  }

  catch (err) {
    console.log('Worker not ready error 4.', err)
  }
}

const setSlider = (sliderNumber: 0 | 1, value: number) => {
  try {
    const slider = sliderNumber === 0 ? 'density' : 'throttle'
    ipc.server.emit(socket, 'performanceData', {
      [slider]: value,
    })
  }

  catch (err) {
    console.log('Worker not ready error 5.', err)
  }
}

const clearAllNotes = () => {
  try {
    ipc.server.emit(socket, 'clearAllNotes')
  }

  catch (err) {
    console.log('Worker not ready error.')
  }
}

const setSequence = (sequence: 'random' | 'up' | 'down' | 'scan') => {
  try {
    ipc.server.emit(socket, 'setSequence', sequence)
    triggerRenderer('setBoardProp', {key: 'sequence', value: sequence})
  }

  catch (err) {
    console.log('Worker not ready error 6.', err)
  }
}

addRendererAppUtil('setNote', setNote)
addRendererAppUtil('setBoard', setBoard)
addRendererAppUtil('clearAllNotes', clearAllNotes)
addRendererAppUtil('setSequence', setSequence)
addRendererAppUtil('setSlider', setSlider)

export {initWorker, start, stop}
