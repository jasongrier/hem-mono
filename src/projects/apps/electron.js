const electron = require('electron')
const { join } = require('path')
const { fork } = require('child_process')
const projectConfig = require(process.env.PROJECT_CONFIG_PATH)
const app = electron.app
const BrowserWindow = electron.BrowserWindow

let mainWindow

app.on('ready', () => {
  mainWindow = new BrowserWindow(projectConfig.BROWSER_WINDOW)

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

  projectConfig.WORKERS.forEach(workerName => {
    const workerPath = join(process.env.PROJECT_CONFIG_PATH, 'workers', workerName + '.worker.js')
    const workerProcess = fork(workerPath)

    workerProcess.on('message', ({message, data}) => {
      console.log(message, data)
    })
  })
})

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
