import { useEffect } from 'react'
import { ClockDivider } from '../../../../common/classes'

function useClock(speed: number, onTickCallback: (tickCount: number) => void) {
  useEffect(() => {
    const clockDivider = new ClockDivider()

    clockDivider.setTempo(speed)

    function requestAnimationFrameCb() {
      requestAnimationFrame(requestAnimationFrameCb)
      clockDivider.onTick(onTickCallback)
    }

    requestAnimationFrameCb()
  }, [])
}

export default useClock
