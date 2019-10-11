const Application = require('spectron').Application
const assert = require('assert')
const electronPath = require('electron') // Require Electron from the binaries included in node_modules.
const path = require('path')

describe('Focus Mode', function () {
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

  it('enters focus mode', async function () {

  })

  it('exits focus mode', async function () {

  })

  it('exits focus mode when pressing escape key', async function () {

  })

  it('has a tooltip', async function () {

  })

  it('has a different tooltip when in focus mode', async function () {

  })
})
