const Application = require('spectron').Application
const assert = require('assert')
const electronPath = require('electron') // Require Electron from the binaries included in node_modules.
const path = require('path')

describe('Editor', function () {
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

  // TODO: One test for all the ways an INSERT_LINE can occur
  // TODO: One test for all the ways an UPDATE_LINE can occur
  // etc...
})
