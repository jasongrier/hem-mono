import React, { ReactElement, useEffect, useState } from 'react'
import { Arpeggiator, Clock, ClockDivider } from '../../../../lib/classes'
import { Mode } from '../../../../lib/classes/Arpeggiator'
import { flashLight } from '../../functions'

const clock = Clock.getInstance()

const initialDimensions = { x: 4, y: 4 }

export const modes: Mode[] = [
  'random',
  'up',
  'down',
  'across',
]

const arpeggiator = new Arpeggiator({
  dimensions: initialDimensions,
  mode: modes[0],
})

let clockDivider: ClockDivider

function lightCol(rowNum: number) {
  const lights = []

  for (let i = 1; i <= 4; i ++) {
    lights.push(
      <span
        className="studio__demo-light"
        id={`clock-divider-demo-light-${rowNum * 4 + i}`}
      />
    )
  }

  return lights
}

function lightGrid() {
  const rows = []

  for (let r = 0; r < 4; r ++) {
    rows.push(
      <p>{lightCol(r)}</p>
    )
  }

  return rows
}

function initDemo() {
  clockDivider = new ClockDivider({
    ticksPerBeat: 8,
    onTickCallback: () => {
      arpeggiator.getNotes().forEach(n => flashLight(`clock-divider-demo-light-${n}`))
    },
  })

  clock.subscribe(clockDivider)
}

function start() {
  clockDivider.start()
}

function stop() {
  clockDivider.stop()
}

function cleanupDemo() {
  clock.unsubscribe(clockDivider) // TODO: Use new self-starting API
}

function ArpeggiatorDemo(): ReactElement {
  const [started, setStarted] = useState(false)

  useEffect(() => {
    initDemo()

    return function cleanup() {
      cleanupDemo()
    }
  }, [])

  useEffect(() => started ? start() : stop(), [started])

  return (
    <div className='page arpeggiator-demo'>
      <h1>Arpeggiator Demo</h1>
      <p>A multimode arpeggiator</p>

      <h2>Instructions</h2>
      <ul>
        <li>Click start</li>
        <li>The lights below should light according to the arpeggiator's mode</li>
        <li>Click the lights to activate/deactivate them for playback</li>
        <li>Use the mode selector to switch between modes</li>
        <li>Use the dimensions selector to change the grid size</li>
        <li>Use the group selector to change the lights' colors</li>
        <li>Use the isolate toggle make it so the two colors will not play at the same time</li>
        <li>Use the tempo selectors to change the speed at which each color group plays</li>
      </ul>

      <p>
        <button onClick={() => setStarted(!started)}>
          {started ? 'STOP' : 'START'}
        </button>
      </p>

      <p>
        <select onChange={evt => arpeggiator.setMode(evt.target.value as Mode)}>
          {modes.map((mode: Mode) => (
            <option
              key={mode}
              value={mode}
            >
              {mode}
            </option>
          ))}
        </select>
      </p>

      <div className="arpeggiator-demo-grid">
        {lightGrid()}
      </div>
    </div>
  )
}

export default ArpeggiatorDemo
