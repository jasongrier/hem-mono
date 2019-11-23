import { each } from 'lodash'
import ClockDivider from './ClockDivider'

class Clock {
  private static instance: Clock
  private clockDividers: {[id: string]: ClockDivider}

  constructor() {
    this.clockDividers = {}

    const tick = () => {
      requestAnimationFrame(tick)
      this.notifySubscribers()
    }

    tick()
  }

  static getInstance() {
    if (!Clock.instance) {
      Clock.instance = new Clock()
    }
    return Clock.instance
  }

  private notifySubscribers() {
    each(this.clockDividers, clockDivider => {
      clockDivider.onTick()
    })
  }

  public subscribe(clockDivider: ClockDivider) {
    this.clockDividers[clockDivider.id] = clockDivider
  }

  public unsubscribe({ id }: ClockDivider) {
    delete this.clockDividers[id]
  }
}

export default Clock
