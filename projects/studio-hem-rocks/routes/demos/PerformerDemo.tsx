import React, { ReactElement, useEffect, useState } from 'react'
import { Clock, ClockDivider, Performer, PerformerMode } from '../../../../lib/classes'

let performer: Performer

function initDemo() {
  performer = new Performer({
    duration: 0,
    mode: 'blink',
    speed: 1,
  })
}

function start() {
}

function stop() {
}

function cleanupDemo() {
  performer.destroy()
}

const modes: PerformerMode[] = [
  'blink',
  'shrink',
  'swell',
  'trill',
]

function PerformerDemo(): ReactElement {
  const [mode, setMode] = useState(0)
  const [speed, setSpeed] = useState(1)

  useEffect(() => {
    initDemo()

    return function cleanup() {
      cleanupDemo()
    }
  }, [])

  return (
    <div className='page performer-demo'>
      <h1>Performer Demo</h1>
      <p>A phrase synthesiser</p>

      <h2>Instructions</h2>
      <ul>
        <li>Click play</li>
        <li>The lights below should light according to the performer's mode</li>
        <li>Use the mode selector to switch between modes</li>
        <li>Use the speed selector to switch between speed</li>
      </ul>
      <p>
        <button onClick={() => {}}>
          PLAY
        </button>
      </p>
      <p>
        <select
          value={mode}
          onChange={evt => setMode(parseInt(evt.target.value, 10))}
        >
          {modes.map((modeName, i) => (
            <option
              key={i}
              value={i}
            >
              {modeName}
            </option>
          ))}
        </select>
      </p>
      <p className="arpeggiator-demo__lights">
      </p>
    </div>
  )
}

export default PerformerDemo
