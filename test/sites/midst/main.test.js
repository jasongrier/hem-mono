import { delay } from '../../helpers'

describe('React Dashboard Widget', () => {
  it('widgets update each other', async () => {
    jest.setTimeout(10000)

    // Log in
    await page.goto('http://localhost:4200')
    await page.waitForSelector('.prelogin-content')
    await page.focus('input[type=email]')
    await page.keyboard.type('j@hemberlin.de')
    await page.focus('input[type=password]')
    await page.keyboard.type('P3ZsG7c5HYnj8cs')
    await page.click('.webapp-log-in')
    await page.waitForSelector('.react-test-widget-form')

    // Update the React widget
    await page.evaluate(() => document.querySelector('.react-test-widget-form input').value = '')
    await page.focus('.react-test-widget-form input')
    await page.keyboard.type('FOO')
    await page.click('.react-test-widget-form button')
    await delay(250)
    const emberOrgName = await page.$eval('.ember-test-widget-form input', el => el.value)
    expect(emberOrgName).toBe('FOO')

    // Update the Ember widget
    await page.evaluate(() => document.querySelector('.ember-test-widget-form input').value = '')
    await page.focus('.ember-test-widget-form input')
    await page.keyboard.type('BAR')
    await page.click('.ember-test-widget-form button')
    await delay(250)
    const reactOrgName = await page.$eval('.react-test-widget-form input', el => el.value)
    expect(reactOrgName).toBe('BAR')
  })
})
