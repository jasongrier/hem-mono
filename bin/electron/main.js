const { app, BrowserWindow } = require('electron')

function createWindow () {
  let win = new BrowserWindow({
    width: 1400,
    height: 780,
    webPreferences: {
      nodeIntegration: true,
    }
  })

  win.loadFile('index.html')

  setTimeout(() => {
    win.loadURL('http://localhost:1234')
  }, 5000)
}

app.whenReady().then(createWindow)
