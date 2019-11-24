import uuid from 'uuid/v1'
import Clock, { IClockSubscriber } from './Clock'

export type PerformanceFunction = (tick: number) => number[]
export type PerformerMode = 'blink' | 'shrink' | 'swell' | 'trill' | PerformanceFunction

export interface IPerformerOpts {
  duration: number
  mode: PerformerMode
  speed: number
}

const clock = Clock.getInstance()

class Performer implements IClockSubscriber {
  private duration: number
  private mode: PerformerMode
  private note: number
  private speed: number
  private tick: number

  public id: string

  constructor({ duration, mode, speed }: IPerformerOpts) {
    this.duration = duration
    this.note = 0
    this.mode = mode
    this.speed = speed
    this.tick = 0

    this.id = uuid()

    clock.subscribe(this)
  }

  private pickBlink() {
    return [this.note]
  }

  private pickShrink() {
    return [this.note]
  }

  private pickSwell() {
    return [this.note]
  }

  private pickTrill() {
    return [this.note]
  }

  private getNotes(): number[] {
    if (typeof this.mode === 'function') {
      return this.mode(this.tick)
    }

    else if (this.mode === 'blink') {
      return this.pickBlink()
    }

    else if (this.mode === 'shrink') {
      return this.pickShrink()
    }

    else if (this.mode === 'swell') {
      return this.pickSwell()
    }

    else if (this.mode === 'trill') {
      return this.pickTrill()
    }

    else {
      return []
    }
  }

  public start(note: number) {
    this.note = note
  }

  public stop() {
    this.tick = 0
  }

  public onTick() {
    this.tick = this.tick + 1

    if (this.tick > this.duration) {
      this.stop()
    }

    else {
      this.getNotes()
    }
  }

  public setMode(mode: PerformerMode) {
    this.mode = mode
    this.stop()
  }

  public setSpeed(speed: number) {
    this.speed = speed
    this.stop()
  }

  public destroy() {
    clock.unsubscribe(this)
  }
}

export default Performer
