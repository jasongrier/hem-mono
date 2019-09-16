import { useEffect } from 'react'
import Tone from 'tone'
import { clockDivider } from '../../../../common/helpers'

function updateTime() {
  requestAnimationFrame(updateTime)
  // rafCb(Tone.context.currentTime.toFixed(3))
  clockDivider((tickCount: number) => {
    console.log('web beat', tickCount)
  })
}

function useClock(source: 'node' | 'web') {
  useEffect(() => {
    if (source === 'node') {
      ipcRenderer.on('tick', (evt: any, timestamp: number) => {
        clockDivider((tickCount: number) => {
          console.log('node beat', tickCount)
        })
      })
    }

    else if (source === 'web') {
      updateTime()
    }
  })
}

export default useClock
