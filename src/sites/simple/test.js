/* TODO: CRA, this sucks. Stop rewiting tsconfig! */ if (typeof DONT_HIDE_TESTS_FROM_CRA_TSC === 'undefined' || DONT_HIDE_TESTS_FROM_CRA_TSC) {

  const puppeteer = require('puppeteer')

  describe('General tests', () => {
    it('works', async (done) => {
      const browser = await puppeteer.launch({ headless: true })
      const page = await browser.newPage()

      jest.setTimeout(10000)
      await page.goto('http://localhost:3000')
      await page.waitForSelector('.hem-application')
      expect.anything()

      await browser.close()
      done()
    })
  })
}
