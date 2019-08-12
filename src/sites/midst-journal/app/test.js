/* TODO: CRA, this sucks. Stop rewiting tsconfig! */ if (typeof DONT_HIDE_TESTS_FROM_CRA_TSC === 'undefined' || DONT_HIDE_TESTS_FROM_CRA_TSC) {

  const puppeteer = require('puppeteer')

  describe('Routing tests', () => {
    it('works', async (done) => {
      const browser = await puppeteer.launch({ headless: true })
      const page = await browser.newPage()

      jest.setTimeout(10000)

      await page.goto('http://localhost:3000')
      await page.waitForSelector('.hem-application')

      await page.goto('http://localhost:3000/faq-for-poets')
      await page.waitForSelector('.page-faq-for-poets')
      await page.goto('http://localhost:3000/about')
      await page.waitForSelector('.page-about')
      await page.goto('http://localhost:3000/contact')
      await page.waitForSelector('.page-contact')
      await page.goto('http://localhost:3000/faq')
      await page.waitForSelector('.page-faq')
      await page.goto('http://localhost:3000/home')
      await page.waitForSelector('.page-home')
      await page.goto('http://localhost:3000/nominate')
      await page.waitForSelector('.page-nominate')
      await page.goto('http://localhost:3000/read')
      await page.waitForSelector('.page-read')
      await page.goto('http://localhost:3000/table-of-contents')
      await page.waitForSelector('.page-table-of-contents')
      await page.goto('http://localhost:3000/the-app')
      await page.waitForSelector('.page-the-app')

      expect.anything()

      await browser.close()
      done()
    })
  })
}
