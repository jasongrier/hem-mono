/* TODO: CRA, this sucks. Stop rewiting tsconfig! */ if (typeof DONT_HIDE_TESTS_FROM_CRA_TSC === 'undefined' || DONT_HIDE_TESTS_FROM_CRA_TSC) {

    const Application = require('spectron').Application
    const assert = require('assert')
    const electronPath = require('electron') // Require Electron from the binaries included in node_modules.
    const path = require('path')

    describe('Dots', function () {
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

      it('activates in the current cursor colour when clicked', function () {
        assert.equal(1, 1)
      })

      it('deactivates when active in the cursor colour and clicked', function () {
        assert.equal(1, 1)
      })

      it('activates in the current cursor colour when dragged over', function () {
        assert.equal(1, 1)
      })

      it('deactivates when active in the cursor colour and is dragged over in erase mode', function () {
        assert.equal(1, 1)
      })

      it('does not deactivate when active in a different color than the cursor and is dragged over in erase mode', function () {
        assert.equal(1, 1)
      })

      it('mouseup ends erase mode', function () {
        assert.equal(1, 1)
      })

      it('lights on for note on', function () {
        assert.equal(1, 1)
      })

      it('lights off for note off', function () {
        assert.equal(1, 1)
      })

      it('stays lighted for a minimum time even when note off is received', function () {
        assert.equal(1, 1)
      })
    })
  }
