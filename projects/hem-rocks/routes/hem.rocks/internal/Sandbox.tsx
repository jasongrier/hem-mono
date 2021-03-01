import React, { ReactElement, useCallback, useEffect, useState } from 'react'
import clock from '../../../../../lib/modules/clock'

function Sandbox(): ReactElement {
  const [playing, setPlaying] = useState<boolean>(clock.getState().playing)
  const [sounds, setSounds] = useState<boolean>(clock.getState().sounds)

  useEffect(function init() {
    clock.init()

    clock.subscribe((time, beat, audioContext) => {
      if (!audioContext) return

      const osc = audioContext.createOscillator()

      osc.connect(audioContext.destination)

      if (beat % 16 === 0) {
        osc.frequency.value = 880.0
      }

      else if (beat % 4 === 0 ) {
        osc.frequency.value = 440.0
      }

      else {
        osc.frequency.value = 220.0
      }

      osc.start(time)
      osc.stop(time + 0.05)
    })
  }, [])

  const startStopOnClick = useCallback(
    function startStopOnClickFn() {
      clock.toggle()
      setPlaying(clock.getState().playing)
    }, [],
  )

  const soundsOnOffOnClick = useCallback(
    function soundsOnOffOnClickFn() {
      clock.toggleSounds()
      setSounds(clock.getState().sounds)
    }, [],
  )

  return (
    <div className='page page-internal page-internal-sandbox'>
      <h2>Sandbox</h2>
      <div>
        <button onClick={startStopOnClick}>{ playing ? 'Stop' : 'Start' }</button>
      </div>
      <div>
        <button onClick={soundsOnOffOnClick}>Sound { sounds ? 'Off' : 'On' }</button>
      </div>
    </div>
  )
}

export default Sandbox
