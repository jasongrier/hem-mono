const puppeteer = require('puppeteer')

function loop(browser, page, cb, count = 0) {
  page.goto('http://localhost:1234')
    .then(function () {
      return page.$('.hem-application')
    })
    .then(function(res) {
      browser.close()

      if (res !== null) {
        cb()
      }

      else if (count ++ > 120) {
        process.exit()
      }

      else {
        setTimeout(function() {
          loop(browser, page, cb, count)
        }, 500)
      }
    })
}

module.exports = async function(cb) {
  const browser = await puppeteer.launch()
  const page = await browser.newPage()
  loop(browser, page, cb, waitForJs)
}
