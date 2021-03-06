const { join } = require('path')
const { app, BrowserWindow } = require('electron')

function createWindow () {
  let win = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: true,
    }
  })

  win.loadFile(join(__dirname, 'loading.html'))

  setTimeout(() => {
    win.loadURL('http://localhost:1234')
  }, 5000)
}

app.whenReady().then(createWindow)
