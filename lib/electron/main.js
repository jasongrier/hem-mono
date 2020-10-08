const { join } = require('path')
const { app, BrowserWindow } = require('electron')

// const { initWorker, playNote, sendControl, startPlaying, stopPlaying } = require('./midi-sync')

// require('midi')

function createWindow () {
  let win = new BrowserWindow({
    // HEM Admin
    // width: 1400,
    // height: 780,

    // Breto
    width: 1024,
    height: 768,
    frame: false,
    resizable: false,

    // Seurat
    // width: 490,
    // height: 390,
    // frame: false,
    // resizable: false,
    webPreferences: {
      nodeIntegration: true,
    }
  })

  win.loadFile(join(__dirname, 'index.html'))

  // initWorker('Breto')

  setTimeout(() => {
    win.loadURL('http://localhost:1234')
  }, 5000)
}

app.whenReady().then(createWindow)

// exports.initWorker = initWorker
// exports.playNote = playNote
// exports.sendControl = sendControl
// exports.startPlaying = startPlaying
// exports.stopPlaying = stopPlaying
