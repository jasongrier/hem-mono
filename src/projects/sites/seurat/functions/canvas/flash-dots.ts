let domDots: any

function flashDots(indices: number[]) {
  domDots = domDots || document.querySelectorAll('.dot')
  indices.forEach((i: number) => {
    domDots[i].classList.add('dot--flashing')
    setTimeout(() => {
      domDots[i].classList.remove('dot--flashing')
    }, 250)
  })
}

function flashDot(index: number) {
  flashDots([index])
}

export default flashDots
