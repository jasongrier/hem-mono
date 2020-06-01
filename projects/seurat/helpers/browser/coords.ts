import {isMouseIn} from './is-mouse-in'
import {mouseTheta} from './mouse-theta'

export const coords = (evt, el, inverted = false) => {
  const m = isMouseIn(evt, el, inverted).percent
  return {
    x: m.x >= 0 && m.x <= 1 ? m.x : m.x < 0 ? 0 : m.x > 1 ? 1 : this.value.x,
    y: m.y >= 0 && m.y <= 1 ? m.y : m.y < 0 ? 0 : m.y > 1 ? 1 : this.value.y,
    theta: mouseTheta(evt, el),
  }
}