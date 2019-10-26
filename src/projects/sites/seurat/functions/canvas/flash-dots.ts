let domDots: any

export function flashDots(indices: number[], classList: string[] = ['dot--flashing']) {
  domDots = domDots || document.querySelectorAll('.dot')
  indices.forEach((i: number) => {
    domDots[i].classList.add(...classList)
    setTimeout(() => {
      domDots[i].classList.remove(...classList)
    }, 250)
  })
}

export function flashDot(index: number, classList?: string[]) {
  flashDots([index], classList)
}
