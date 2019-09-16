const NanoTimer = require('nanotimer')

class Clock {
  constructor(onBeat, ticksPerBeat = 48) {
    const timer = new NanoTimer()

    timer.setInterval(() => {
      this.clockDivider()
    }, '', 20.833333333 + 'm')

    this.onBeat = onBeat
    this.running = false
    this.tickCount = 0
    this.ticksPerBeat = ticksPerBeat
  }

  clockDivider() {
    if (this.tickCount === 1) {
      if (this.running) {
        this.tickCount ++
        this.onBeat()
      }
    }

    else if (this.tickCount === this.ticksPerBeat) {
      this.tickCount = 1
    }

    else {
      this.tickCount ++
    }
  }

  start() {
    this.running = true
  }

  stop() {
    this.running = false
  }
}

module.exports = Clock
