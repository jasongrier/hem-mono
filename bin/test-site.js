// TODO: Probably this whole file should be a custom preset: https://jestjs.io/docs/en/puppeteer#custom-example-without-jest-puppeteer-preset
const { writeFileSync } = require('fs')
const { execSync } = require('child_process')
const puppeteer = require('puppeteer')
const projectConfig = require('../public/project-config')

function catchDevServer(page, cb, count = 0) {
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
        console.log('Dev app took too long to start up.')
        process.exit(1)
      }

      else {
        setTimeout(function() {
            catchDevApp(page, cb, count)
        }, 500)
      }
    })
}

async function test() {
  const browser = await puppeteer.launch()
  const page = await browser.newPage()

  // catchDevServer(page, function() {
  //   catchDevApp(page, function() {
      try {
        execSync(`jest --testRegex='test/${projectConfig.PROJECT_TYPE}/${projectConfig.PROJECT_NAME}/main.test.js'`, { stdio: 'inherit' })
      }

      catch(err) {
        console.log(err)
        process.exit(1)
      }

      browser.close()
      process.exit(0)
  //   })
  // })
}

test()
