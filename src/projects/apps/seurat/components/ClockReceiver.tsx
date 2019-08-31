import React, { ReactElement, useEffect } from 'react'

let domDots: any

function flashDots(evt: any, data: number[]) {
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

function ClockReceiver(): ReactElement {
  useEffect(() => {
    ipcRenderer.on('beat', flashDots)
  })

  return (
    <div />
  )
}

export default ClockReceiver
