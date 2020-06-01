import {app, BrowserWindow} from 'electron'
import {initWorker} from './sync'
import {renderMenu} from './menu'

initWorker()

app.on('ready', () => {
  let mainWindow = new BrowserWindow({
    x: 20,
    y: 70,
    width: 390,
    height: 390,
    frame: false,
    resizable: false,
  })

  mainWindow.on('closed', () => {
    mainWindow = null
  })

  mainWindow.on('focus', () => {
    mainWindow.webContents.send('focus')
  })

  mainWindow.on('blur', () => {
    mainWindow.webContents.send('blur')
  })

  if (process.env.NODE_ENV === 'development') {
    mainWindow.loadURL(`http://0.0.0.0:${process.env.BROWSER_PORT}`)
  }

  else {
    mainWindow.loadURL(`file://${__dirname}/index.html`)
  }

  renderMenu()
})