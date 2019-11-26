import React, { ReactElement, useEffect, useState } from 'react'
import { Arpeggiator, Clock, ClockDivider } from '../../../../lib/classes'
import { Mode } from '../../../../lib/classes/Arpeggiator'
import { flashLight } from '../../functions'

const clock = Clock.getInstance()

const dimensions = { x: 4, y: 4 }
const numNotes = dimensions.x * dimensions.y

export const modes: Mode[] = [
  'across',
  'random',
  'up',
  'down',
]

const arpeggiator = new Arpeggiator({
  dimensions,
  mode: modes[0],
})

let clockDivider: ClockDivider

function lightCol(rowNum: number, offset: number) {
  const lights = []

  for (let i = 1; i <= 4; i ++) {
    const noteNum = (rowNum * 4 + i) + offset
    const id = `clock-divider-demo-light-${noteNum}`
    lights.push(
      <span
        className="studio-demo-light"
        id={id}
        key={id}
      />
    )
  }

  return lights
}

function lightGrid(offset: number = 0) {
  const rows = []

  for (let r = 0; r < 4; r ++) {
    rows.push(
      <span
        className="arpeggiator-demo-grid-row"
        key={r}
      >
        {lightCol(r, offset)}
      </span>
    )
  }

  return rows
}

function activateNotes(some: boolean) {
  deactivateAllNotes()

  some ? activateSomeNotes() : activateAllNotes()

  for (let i = 1; i <= numNotes; i ++) {
    const light = document.getElementById(`clock-divider-demo-light-${i}`)

    if (!light) return

    if (arpeggiator.isNoteActive(i)) {
      light.classList.add('studio-demo-light-active')
    }

    else {
      light.classList.remove('studio-demo-light-active')
    }
  }
}

function deactivateAllNotes() {
  for (let i = 1; i <= numNotes; i ++) {
    arpeggiator.deactivateNote(i)
  }
}

function activateAllNotes() {
  for (let i = 1; i <= numNotes; i ++) {
    arpeggiator.activateNote(i)
  }
}

function activateSomeNotes() {
  arpeggiator.activateNote(1)
  arpeggiator.activateNote(2)
  arpeggiator.activateNote(3)
  arpeggiator.activateNote(4)
  arpeggiator.activateNote(13)
  arpeggiator.activateNote(14)
  arpeggiator.activateNote(15)
  arpeggiator.activateNote(16)
}

activateAllNotes()

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
  const [some, setSome] = useState(false)

  useEffect(() => {
    initDemo()

    return function cleanup() {
      cleanupDemo()
    }
  }, [])

  useEffect(() => started ? start() : stop(), [started])
  useEffect(() => activateNotes(some), [some])

  return (
    <div className='page arpeggiator-demo'>
      <h1>Arpeggiator Demo</h1>
      <p>A multimode arpeggiator</p>

      <h2>Instructions</h2>
      <ul>
        <li>Click "START"</li>
        <li>The lights below should light according to the arpeggiator's mode</li>
        <li>Use the mode selector to switch between modes</li>
        <li>Click "SOME" to make only selected notes eligible to play</li>
        <li>Click "EXCLUSIVE" to make the second arpeggiator block the first</li>
      </ul>

      <p>
        <button onClick={() => setStarted(!started)}>
          {started ? 'STOP' : 'START'}
        </button>
      </p>

      <p>
        <button onClick={() => setSome(!some)}>
          {some ? 'ALL' : 'SOME'}
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

      <p>
        <span className="arpeggiator-demo-grid">
          {lightGrid()}
        </span>

        <span className="arpeggiator-demo-grid">
          {lightGrid(numNotes)}
        </span>
      </p>
    </div>
  )
}

export default ArpeggiatorDemo
