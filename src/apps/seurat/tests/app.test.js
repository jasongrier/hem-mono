/* TODO: CRA, this sucks. Stop rewiting tsconfig! */ if (typeof DONT_HIDE_TESTS_FROM_CRA_TSC === 'undefined' || DONT_HIDE_TESTS_FROM_CRA_TSC) {

  const Application = require('spectron').Application
  const assert = require('assert')
  const electronPath = require('electron') // Require Electron from the binaries included in node_modules.
  const path = require('path')

  describe('Startup', function () {
    this.timeout(10000)

    beforeEach(async function () {
      this.app = new Application({
        path: electronPath,
        args: [path.join(__dirname, '..', '..', '..', '..')]
      })
      return this.app.start()
    })

    afterEach(function () {
      if (this.app && this.app.isRunning()) {
        return this.app.stop()
      }
    })

    it('shows an initial window', function () {
      return this.app.client.getWindowCount().then(function (count) {
        assert.equal(count, 1)
      })
    })
  })
}
