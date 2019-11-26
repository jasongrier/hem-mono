import uuid from 'uuid/v1'
import Clock from './Clock'

const clock = Clock.getInstance()

class Metronome {
  private on: boolean = false
  private onBeat: () => void
  private speed: number = 8
  private ticks: number = 1

  public id: string

  constructor(onBeat: () => void) {
    this.on = false
    this.onBeat = onBeat
    this.ticks = 1
    this.id = uuid()

    clock.subscribe(this)
  }

  public onTick() {
    if (!this.on) return

    this.ticks = this.ticks === this.speed ? 1 : this.ticks + 1

    if (this.ticks === 1) {
      this.onBeat()
    }
  }

  public stop() {
    this.on = false
  }

  public setSpeed(speed: number) {
    this.stop()
    this.speed = speed
    this.start()
  }

  public start() {
    this.ticks = 1
    this.on = true
  }

  public destroy() {
    clock.unsubscribe(this)
  }
}

export default Metronome
