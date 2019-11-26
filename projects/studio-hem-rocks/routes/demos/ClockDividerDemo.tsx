import React, { ReactElement, useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'
import { flashLight } from '../../functions'
import { ClockDivider } from '../../../../lib/classes'
import { BASE_SITE_PAGE_TITLE } from '../../config'

let clockDividerA: ClockDivider
let clockDividerB: ClockDivider
let clockDividerC: ClockDivider

function initDemo() {
  clockDividerA = new ClockDivider({
    ticksPerBeat: 32,
    onTickCallback: () => flashLight('clock-divider-demo-light-a'),
  })

  clockDividerB = new ClockDivider({
    ticksPerBeat: 24,
    onTickCallback: () => flashLight('clock-divider-demo-light-b'),
  })

  clockDividerC = new ClockDivider({
    ticksPerBeat: 16,
    onTickCallback: () => flashLight('clock-divider-demo-light-c'),
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
    <main className='page clock-divider-demo'>
      <Helmet>
        <title>{BASE_SITE_PAGE_TITLE} Clock Divider Demo</title>
        <meta name="description" content="" />
      </Helmet>

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
          className="studio-demo-light"
          id="clock-divider-demo-light-a"
        />
      </p>
      <p>
        B:
        <span
          className="studio-demo-light"
          id="clock-divider-demo-light-b"
        />
      </p>
      <p>
        C:
        <span
          className="studio-demo-light"
          id="clock-divider-demo-light-c"
        />
      </p>
    </main>
  )
}

export default ClockDividerDemo
