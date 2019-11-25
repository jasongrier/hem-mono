import { each } from 'lodash'

export type OnTickCallback = (tickCount: number) => void

export interface IClockSubscriber {
  destroy: () => void
  id: string
  onTick: () => void
}

class Clock {
  private static instance: Clock
  private subscribers: {[id: string]: IClockSubscriber}

  constructor() {
    this.subscribers = {}

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
    each(this.subscribers, subscriber => {
      subscriber.onTick()
    })
  }

  public subscribe(subscriber: IClockSubscriber) {
    this.subscribers[subscriber.id] = subscriber
  }

  public unsubscribe({ id }: IClockSubscriber) {
    delete this.subscribers[id]
  }
}

export default Clock
