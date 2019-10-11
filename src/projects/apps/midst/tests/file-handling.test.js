const Application = require('spectron').Application
const assert = require('assert')
const electronPath = require('electron') // Require Electron from the binaries included in node_modules.
const path = require('path')

describe('File Handling', function () {
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

  // Normal File Handling
  it('opens a file, confirming if there are unsaved changes', async function () {

  })

  it('saves a file, asking for name and location if this is a new document', async function () {

  })

  it('saves a file as', async function () {

  })

  // Buttons
  it('works the same when using the new button', async function () {

  })

  it('works the same when using the open button', async function () {

  })

  it('works the same when using the save button', async function () {

  })

  // Backwards-compatibility
  it('opens a 2018 file', async function () {

  })

  it('opens a 2019 file', async function () {

  })

  it('creates a new file, confirming if there are unsaved changes', async function () {

  })
})
