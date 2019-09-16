let domDots: any

function flashDots(data: number[]) {
  domDots = domDots || document.querySelectorAll('.dot')
  data.forEach((on, i) => {
    if (on) {
      domDots[i].classList.add('dot--flashing')
      setTimeout(() => {
        domDots[i].classList.remove('dot--flashing')
      }, 250)
    }
  })
}
