import { useEffect } from 'react'
import { clockDivider } from '../../../../common/helpers'

// let initialized: boolean = false
let webOnTick: () => void

function requestAnimationFrameCb() {
  requestAnimationFrame(requestAnimationFrameCb)
  clockDivider(webOnTick)
}

function useClock(source: 'node' | 'web', onTick: () => void) {
  useEffect(() => {
    // if (!initialized) {
      if (source === 'node') {
        ipcRenderer.on('tick', () => {
          clockDivider(onTick)
        })
      }

      else {
        webOnTick = onTick
        requestAnimationFrameCb()
      }

      // initialized = true
    // }
  }, [])
}

export default useClock
