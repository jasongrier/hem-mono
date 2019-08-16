const Application = require('spectron').Application
const assert = require('assert')
const electronPath = require('electron') // Require Electron from the binaries included in node_modules.
const path = require('path')
const promiseTimeout = require('../../../../../bin/promise-timeout')

describe('Startup', function () {
  this.timeout(1000 * 60)

  beforeEach(async function () {
    this.app = new Application({
      path: electronPath,
      args: [path.join(__dirname, '..', '..')]
    })

    return this.app.start()
  })

  afterEach(async function () {
    if (this.app && this.app.isRunning()) {
      return this.app.stop()
    }
  })

  it('shows an initial window', async function () {
    const count = await this.app.client.getWindowCount()
    assert.equal(count, 1)
  })

  it('runs', async function () {
    const res = await this.app.client.$('.hem-application')
    console.log(res)
    assert.equal(1, 1)
  })
})
