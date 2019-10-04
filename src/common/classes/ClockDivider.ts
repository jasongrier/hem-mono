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

  constructor(opts: IOpts) {
    this.opts = { ...defaults, ...opts }
  }

  public onTick(onTickCallback: () => void) {
    if (this.opts.name === 'foo') {
      console.log(this.tickCount, this.opts.ticksPerBeat)
    }

    if (this.tickCount === 1 || this.opts.ticksPerBeat === 1) {
      onTickCallback()

      if (this.opts.ticksPerBeat !== 1) {
        this.tickCount ++
      }
    }

    else if (this.tickCount >= this.opts.ticksPerBeat) {
      this.tickCount = 1
      if (this.opts.name === 'foo') {
        console.log('reset')
      }
    }

    else {
      this.tickCount ++
    }
  }

  public setTempo(tempo: number) {
    console.log(tempo)
    this.opts.ticksPerBeat = tempo
  }
}

export default ClockDivider
