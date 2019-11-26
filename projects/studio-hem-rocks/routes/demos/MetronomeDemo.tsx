import React, { ReactElement, useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'
import { flashLight } from '../../functions'
import { Metronome } from '../../../../lib/classes'
import { BASE_SITE_PAGE_TITLE } from '../../config'

function lightId(n: number) {
  return `metronome-demo-light-${n}`
}

function createMetronome(speed: number): Metronome {
  const metronome = new Metronome(() => flashLight(lightId(speed)))
  metronome.setSpeed(speed)
  return metronome
}

const metronome32 = createMetronome(32)
const metronome24 = createMetronome(24)
const metronome16 = createMetronome(16)

function startDemo() {
  metronome32.start()
  metronome24.start()
  metronome16.start()
}

function stopDemo() {
  metronome32.stop()
  metronome24.stop()
  metronome16.stop()
}

function metronomeCell(number: number) {
  return (
    <p>
      {number}:
      <span
        className="studio-demo-light"
        id={lightId(number)}
      />
    </p>
  )
}

function MetronomeDemo(): ReactElement {
  const [started, setStarted] = useState(false)

  useEffect(() => {
    return function cleanup() {
      metronome32.destroy()
      metronome24.destroy()
      metronome16.destroy()
    }
  }, [])

  useEffect(() => started ? startDemo() : stopDemo(), [started])

  return (
    <main className='page metronome-demo'>
      <Helmet>
        <title>{BASE_SITE_PAGE_TITLE} Metronome Demo</title>
        <meta name="description" content="" />
      </Helmet>

      <h1>Metronome Demo</h1>
      <p>Precise timers</p>

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

      {metronomeCell(32)}
      {metronomeCell(24)}
      {metronomeCell(16)}
    </main>
  )
}

export default MetronomeDemo
