interface IOpts {
  ticksPerBeat: number
  name?: string
}

const defaults: IOpts = {
  ticksPerBeat: 16,
  name: 'Untitled',
}

class ClockDivider {
  private tickCount: number = 0

  private opts: IOpts

  constructor(opts?: IOpts) {
    this.opts = { ...defaults, ...(opts || {})}
  }

  public onTick(onTickCallback: (tickCount: number) => void) {
    if (this.tickCount === 1 || this.opts.ticksPerBeat === 1) {
      onTickCallback(this.tickCount)

      if (this.opts.ticksPerBeat !== 1) {
        this.tickCount ++
      }
    }

    else if (this.tickCount >= this.opts.ticksPerBeat) {
      this.tickCount = 1
    }

    else {
      this.tickCount ++
    }
  }

  public setTempo(tempo: number) {
    this.opts.ticksPerBeat = tempo
  }
}

export default ClockDivider
