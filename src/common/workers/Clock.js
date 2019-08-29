import NanoTimer from 'nanotimer'

export class Clock {
  constructor(onBeat, ticksPerBeat = 48) {
    // TODO: Throw if instantiated from main process or renderer process
    const timer = new NanoTimer()

    timer.setInterval(() => {
      this.clockDivider()
    }, '', 20.833333333 + 'm')

    this.onBeat = onBeat
    this.running = false
    this.tickCount = 0
    this.ticksPerBeat = ticksPerBeat
  }

  clockDivider = () => {
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

  setRunning(running) {
    this.running = running
  }
}
