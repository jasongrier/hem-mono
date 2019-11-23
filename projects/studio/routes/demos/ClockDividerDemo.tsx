import React, { ReactElement, useEffect, useState } from 'react'
import { Clock, ClockDivider } from '../../../../lib/classes'

const clock = Clock.getInstance()

let clockDividerA
let clockDividerB
let clockDividerC

function lightLight(name: string) {
  const light = document.getElementById('clock-divider-demo-light-' + name)

  if (!light) return

  light.classList.add('studio__demo-light--lighted')
  setTimeout(() => {
    light.classList.remove('studio__demo-light--lighted')
  }, 100)
}

function initMvp() {
  clockDividerA = new ClockDivider({
    ticksPerBeat: 32,
    onTickCallback: () => lightLight('a'),
  })

  clockDividerB = new ClockDivider({
    ticksPerBeat: 24,
    onTickCallback: () => lightLight('b'),
  })

  clockDividerC = new ClockDivider({
    ticksPerBeat: 16,
    onTickCallback: () => lightLight('c'),
  })

  clock.subscribe(clockDividerA)
  clock.subscribe(clockDividerB)
  clock.subscribe(clockDividerC)
}

function start() {
  clockDividerA.start()
  clockDividerB.start()
  clockDividerC.start()
}

function stop() {
  clockDividerA.stop()
  clockDividerB.stop()
  clockDividerC.stop()
}

function cleanupMvp() {
  clock.unsubscribe(clockDividerA)
  clock.unsubscribe(clockDividerB)
  clock.unsubscribe(clockDividerC)
}

function ClockDividerDemo(): ReactElement {
  const [started, setStarted] = useState(false)

  useEffect(() => {
    initMvp()

    return function cleanup() {
      cleanupMvp()
    }
  }, [])

  useEffect(() => {
    if (started) {
      start()
    }

    else {
      stop()
    }
  }, [started])

  return (
    <div className='page clock-divider-demo'>
      <h1>Clock Divider MVP</h1>
      <p>Generate precise timers</p>
      <p>Requires Google Chrome</p>
      <h2>Instructions</h2>
      <ul>
        <li>Click start</li>
        <li>The lights below should light at three different varying rates</li>
        <li>Light "C" should light at exactly 1/2 the rate of light "A"</li>
      </ul>
      <p>
        <button
          onClick={() => setStarted(!started)}
        >
          {started ? 'STOP' : 'START'}
        </button>
      </p>
      <p>
        A:
        <span
          className="studio__demo-light"
          id="clock-divider-demo-light-a"
        />
      </p>
      <p>
        B:
        <span
          className="studio__demo-light"
          id="clock-divider-demo-light-b"
        />
      </p>
      <p>
        C:
        <span
          className="studio__demo-light"
          id="clock-divider-demo-light-c"
        />
      </p>
    </div>
  )
}

export default ClockDividerDemo
