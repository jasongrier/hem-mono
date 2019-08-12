// TODO: Probably this whole file should be a custom preset: https://jestjs.io/docs/en/puppeteer#custom-example-without-jest-puppeteer-preset
const { spawn } = require('child_process')
const { execSync } = require('child_process')
const puppeteer = require('puppeteer')

function catchDevServer(page, cb, count = 0) {
  console.log('Waiting for dev server...')
  page.goto('http://localhost:3000')
    .then(cb)
    .catch(function() {
      if (count++ > 240) { // 2 minutes
        console.log('Dev server took too long to start up.')
        process.exit(1)
      }

      setTimeout(function() {
        catchDevServer(page, cb, count)
      }, 500)
    })
}

function catchDevApp(page, cb, count = 0) {
  page.$('#root .hem-application')
    .then(function(res) {
      if (res !== null) {
        cb()
      }

      else if (count++ > 240) { // 2 minutes
        console.log('Dev server took too long to start up.')
        process.exit(1)
      }

      else {
        setTimeout(function() {
          catchDevApp(page, cb, count)
        }, 500)
      }
    })
}

async function testSite() {
  const browser = await puppeteer.launch()
  const page = await browser.newPage()
  const devProcess = spawn('BROWSER=none yarn start', [], { shell: true, detached: true })

  catchDevServer(page, function() {
    catchDevApp(page, function() {
      try {
        browser.close() // The test needs to reopen the browser in order to get an instance of it
        execSync('rescripts test --watchAll=false --env=jsdom', { stdio: 'inherit' })
      }

      catch(err) {
        console.log(err)
        process.exit(1)
      }

      process.kill(-devProcess.pid)
      process.exit(0)
    })
  })
}

module.exports = testSite
