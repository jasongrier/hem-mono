const puppeteer = require('puppeteer')

function catchWebappLoop(browser, page, cb, count = 0) {
  console.log('Waiting for webapp...')

  page.goto('http://localhost:1234')
    .then(function () {
      page.$('.hem-application')
        .then(function(res) {
          if (res !== null) {
            browser.close()
            cb()
          }

          else if (count++ > 120) {
            console.log('Webapp took too long to start up.')
            process.exit(1)
          }

          else {
            setTimeout(function() {
              catchWebappLoop(browser, page, cb, count)
            }, 500)
          }
        })
    })
}

module.exports = async function(cb) {
  const browser = await puppeteer.launch()
  const page = await browser.newPage()
  catchWebappLoop(browser, page, cb)
}
