const Application = require('spectron').Application
const assert = require('assert')
const electronPath = require('electron') // Require Electron from the binaries included in node_modules.
const path = require('path')

describe('Drawer', function () {
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

  it('shows text', async function () {

  })

  it('applies formatting', async function () {

  })

  it('applies multiple formattings to overlapping ranges', async function () {

  })
})