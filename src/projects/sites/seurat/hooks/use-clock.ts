import { useEffect } from 'react'
import { ClockDivider } from '../../../../common/classes'

const webClockDivider = new ClockDivider()
// const nodeClockDivider = new ClockDivider()

let webOnTickCallback: (tickCount: number) => void

function requestAnimationFrameCb() {
  requestAnimationFrame(requestAnimationFrameCb)
  webClockDivider.onTick(webOnTickCallback)
}

function useClock(source: 'node' | 'web', onTickCallback: (tickCount: number) => void) {
  useEffect(() => {
    if (source === 'node') {
      // ipcRenderer.on('tick', () => {
      //   nodeClockDivider.onTick(onTickCallback)
      // })
    }

    else {
      webOnTickCallback = onTickCallback
      requestAnimationFrameCb()
    }
  }, [])
}

export default useClock
