import uuid from 'uuid/v1'
import Clock, { OnTickCallback } from './Clock'

const clock = Clock.getInstance()

export interface IClockDividerOpts {
  onTickCallback: OnTickCallback
  ticksPerBeat: number
}

class ClockDivider {
  private onTickCallback: OnTickCallback
  private on: boolean
  private tickCount: number
  private ticksPerBeat: number

  public id: string

  constructor({ ticksPerBeat, onTickCallback }: IClockDividerOpts) {
    this.on = false
    this.onTickCallback = onTickCallback
    this.tickCount = 1
    this.ticksPerBeat = ticksPerBeat

    this.id = uuid()

    clock.subscribe(this)
  }

  public onTick() {
    if (!this.on) return

    if (this.tickCount === 1 || this.ticksPerBeat === 1) {
      this.onTickCallback(this.tickCount)

      if (this.ticksPerBeat !== 1) {
        this.tickCount ++
      }
    }

    else if (this.tickCount >= this.ticksPerBeat) {
      this.tickCount = 1
    }

    else {
      this.tickCount ++
    }
  }

  public start() {
    this.tickCount = 1
    this.on = true
  }

  public stop() {
    this.on = false
  }

  public setTicksPerBeat(ticksPerBeat: number) {
    this.ticksPerBeat = ticksPerBeat
  }

  public destroy() {
    clock.unsubscribe(this)
  }
}

export default ClockDivider
