const { join } = require('path')
const { fork } = require('child_process')
const { BrowserWindow } = require('electron')
const ipc = require('node-ipc')

let socket

const initWorker = (name) => {
  ipc.config.id = 'world'
  ipc.config.retry = 1500
  ipc.serve(() => {
    console.log(BrowserWindow.getAllWindows()[0].webContents)

    const renderer = BrowserWindow.getAllWindows()[0].webContents

    ipc.server.on('connected', (undefined, sck) => {
      socket = sck
      ipc.server.emit(socket, 'CREATE_MIDI_PORTS', name)
    })

    ipc.server.on('START_FROM_MIDI', function() {
      renderer.send(name, 'START_FROM_MIDI')
    })

    ipc.server.on('STOP_FROM_MIDI', function() {
      renderer.send(name, 'STOP_FROM_MIDI')
    })
  })

  ipc.server.start()

  const workerPath = join(__dirname, '.', 'midi-worker')
  const workerParams = []
  const workerOpts = { stdio: [0, 1, 2, 'ipc'] }

  // @ts-ignore
  fork(workerPath, workerParams, workerOpts)
}

function playNote() {
  ipc.server.emit(socket, 'PLAY_NOTE')
}

function sendControl(controlNumber, value) {
  ipc.server.emit(socket, 'SEND_CONTROL', { controlNumber, value })
}

function startPlaying() {
  ipc.server.emit(socket, 'START_PLAYING')
}

function stopPlaying() {
  ipc.server.emit(socket, 'STOP_PLAYING')
}

exports.initWorker = initWorker
exports.playNote = playNote
exports.sendControl = sendControl
exports.startPlaying = startPlaying
exports.stopPlaying = stopPlaying
