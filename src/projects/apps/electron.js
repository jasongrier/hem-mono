const electron = require('electron')
const path = require('path')
const url = require('url')
const app = electron.app
const BrowserWindow = electron.BrowserWindow

let mainWindow

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 780,
    transparent: true,
    titleBarStyle: 'hidden',
    webPreferences: {
      nodeIntegration: true,
    }
  })

  if (process.env.ELECTRON_START_URL) {
    require(__dirname + '/../../../bin/catch-webapp')(function() {
      mainWindow.loadURL(process.env.ELECTRON_START_URL)
    })
  }

  else if (process.env.ELECTRON_TEST) {
    mainWindow.loadURL(`file://${__dirname}/../../../dist/index.html`)
  }

  else {
    mainWindow.loadURL(`file://${__dirname}/../build/index.html`)
  }

  mainWindow.on('closed', () => {
    mainWindow = null
  })
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})
