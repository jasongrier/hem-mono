/**
 * Just another helper.
 */
export const isMouseIn = (evt, el, invert = false) => {
  const rect = el.getBoundingClientRect()
  const mouseIn =
    evt.clientX > rect.left &&
    evt.clientX < rect.left + rect.width &&
    evt.clientY > rect.top &&
    evt.clientY < rect.top + rect.height

  let percent
  if (invert) {
    percent = {
      x: (rect.left - evt.clientX) / rect.width,
      y: (rect.top - evt.clientY) / rect.height * -1,
    }
  }

  else {
    percent = {
      x: (evt.clientX - rect.left) / rect.width,
      y: (evt.clientY - (rect.top + rect.height)) / rect.height * -1,
    }
  }

  return {
    mouseIn,
    percent,
  }
}
