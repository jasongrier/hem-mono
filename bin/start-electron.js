const { join } = require('path')
const net = require('net')
const { spawn } = require('child_process')

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
        const electronProcess = spawn('electron', ['./src/projects/apps/electron'])

        electronProcess.stdout.on('data', data => {
          console.log(data.toString())
        })

        electronProcess.stderr.on('data', data => {
          console.log(data.toString())
        })

        startedElectron = true
      }
    }
  )
}

tryConnection()

client.on('error', () => {
  setTimeout(tryConnection, 1000)
})
