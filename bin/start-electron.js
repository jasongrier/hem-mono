const { join } = require('path')
const net = require('net')
const { exec } = require('child_process')

const port = 1234

process.env.ELECTRON_START_URL = `http://localhost:${port}`

const client = new net.Socket()

let startedElectron = false

const tryConnection = () => {
  client.connect(
    { port },
    () => {
      client.end()
      if (!startedElectron) {
        startedElectron = true
        exec('electron ./src/projects/apps/electron')
      }
    }
  )
}

tryConnection()

client.on('error', () => {
  setTimeout(tryConnection, 1000)
})
