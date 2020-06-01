const { app, BrowserWindow } = require('electron')

function createWindow () {
  let win = new BrowserWindow({
    width: 1400,
    height: 780,
    // width: 490,
    // height: 390,
    // frame: false,
    // resizable: false,
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
