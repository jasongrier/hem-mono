import React, { ReactElement, useEffect, useState } from 'react'
import { flashLight } from '../../functions'
import { ClockDivider } from '../../../../lib/classes'

let clockDividerA: ClockDivider
let clockDividerB: ClockDivider
let clockDividerC: ClockDivider

function initDemo() {
  clockDividerA = new ClockDivider({
    ticksPerBeat: 32,
    onTickCallback: () => flashLight('a'),
  })

  clockDividerB = new ClockDivider({
    ticksPerBeat: 24,
    onTickCallback: () => flashLight('b'),
  })

  clockDividerC = new ClockDivider({
    ticksPerBeat: 16,
    onTickCallback: () => flashLight('c'),
  })
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

function cleanupDemo() {
  clockDividerA.destroy()
  clockDividerB.destroy()
  clockDividerC.destroy()
}

function ClockDividerDemo(): ReactElement {
  const [started, setStarted] = useState(false)

  useEffect(() => {
    initDemo()

    return function cleanup() {
      cleanupDemo()
    }
  }, [])

  useEffect(() => started ? start() : stop(), [started])

  return (
    <div className='page clock-divider-demo'>
      <h1>Clock Divider Demo</h1>
      <p>Generate precise timers</p>

      <h2>Instructions</h2>
      <ul>
        <li>Click start</li>
        <li>The lights below should light at three different varying rates</li>
        <li>Light "C" should light at exactly 1/2 the rate of light "A"</li>
      </ul>
      <p>
        <button onClick={() => setStarted(!started)}>
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
