const puppeteer = require('puppeteer')

function catchWebappLoop(browser, page, cb, waitForJs, count = 0) {
  page.goto('http://localhost:1234')
    .then(function () {
      if (waitForJs) {
        page.$('.hem-application')
          .then(function(res) {
            if (res !== null) {
              browser.close()
              console.log('Found the webapp. Starting your task now')
              cb()
            }

            else if (count++ > 120) {
              console.log('Webapp took too long to start up.')
              process.exit(1)
            }

            else {
              setTimeout(function() {
                catchWebappLoop(browser, page, cb, waitForJs,count)
              }, 500)
            }
          })
      }

      else {
        browser.close()
        console.log('Found the webapp. Starting your task now')
        cb()
      }
    })
    .catch(function () {
      if (count++ > 120) {
        console.log('Webapp took too long to start up.')
        process.exit(1)
      }

      else {
        setTimeout(function() {
          catchWebappLoop(browser, page, cb, waitForJs, count)
        }, 500)
      }
    })
}

module.exports = async function(cb, waitForJs = true) {
  const browser = await puppeteer.launch()
  const page = await browser.newPage()
  catchWebappLoop(browser, page, cb, waitForJs)
}
