// TODO: Probably this whole file should be a custom preset: https://jestjs.io/docs/en/puppeteer#custom-example-without-jest-puppeteer-preset
const { spawn } = require('child_process')
const { execSync } = require('child_process')
const puppeteer = require('puppeteer')
const { PROJECT_TYPE, PROJECT_NAME } = require('../project.config')

function catchDevServer(page, cb, count = 0) {
  console.log('Waiting for dev server...')
  page.goto('http://localhost:1234')
    .then(cb)
    .catch(function() {
      if (count++ > 60) {
        console.log('Dev server took too long to start up.')
        process.exit(1)
      }

      setTimeout(function() {
        catchDevServer(page, cb, count)
      }, 500)
    })
}

function catchWebapp(page, cb, count = 0) {
  console.log('Waiting for webapp...')

  page.goto('http://localhost:1234')
    .then(function () {
      page.$('.hem-application')
        .then(function(res) {
          if (res !== null) {
            cb()
          }

          else if (count++ > 120) {
            console.log('Webapp took too long to start up.')
            process.exit(1)
          }

          else {
            setTimeout(function() {
              catchWebapp(page, cb, count)
            }, 500)
          }
        })
    })

}

async function testSite() {
  const browser = await puppeteer.launch({ headless: false })
  const page = await browser.newPage()
  const devProcess = spawn('npm start', [], { shell: true, detached: true })

  catchWebapp(page, function() {
    try {
      browser.close() // The test needs to reopen the browser in order to get an instance of it
      const testPattern = `${__dirname}/../src/projects/${PROJECT_TYPE}s/${PROJECT_NAME}/tests/*.test.js`
      console.log(`Testing: ${testPattern}`)
      execSync(`mocha -p tsconfig.json ${testPattern}`, { stdio: 'inherit' })
    }

    catch(err) {
      console.log(err)
      process.exit(1)
    }

    process.kill(-devProcess.pid)
    process.exit(0)
  })
}

module.exports = testSite
