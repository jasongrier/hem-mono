import React, { ReactElement, useEffect, useState } from 'react'
import { Arpeggiator, ArpeggiatorMode, Metronome } from '../../../../lib/classes'
import { flashLight as baseFlashLight } from '../../functions'

const arpeggiator = new Arpeggiator()
const metronome = new Metronome(() => {
  arpeggiator.pickNotes().map(flashLight)
})

function activateAllNotes() {
  for (let n = 1; n <= 16; n ++) {
    arpeggiator.activateNote(n)
    setLight(n, true)
  }
}

function activatePattern() {
  for (let n = 1; n <= 16; n ++) {
    if (n % 2 == 0) {
      arpeggiator.activateNote(n)
      setLight(n, true)
    }

    else {
      arpeggiator.deactivateNote(n)
      setLight(n, false) // TODO: Add this issue to blog post on problems using React for creative code
    }
  }
}

function lightId(n: number) {
  return `arpeggiator-demo-light-${n + 1}`
}

function flashLight(n: number) {
  baseFlashLight(lightId(n - 1))
}

function setLight(n: number, on: boolean) {
  const light = document.getElementById(lightId(n - 1))
  if (!light) return
  if (on) {
    light.classList.add('studio-demo-light-active')
  }

  else {
    light.classList.remove('studio-demo-light-active')
  }
}

activateAllNotes()
arpeggiator.setMode('up')

function ArpeggiatorDemo(): ReactElement {
  const [notes, setNotes] = useState(arpeggiator.getNotes())
  const [pattern, setPattern] = useState(false)
  const [started, setStarted] = useState(false)

  useEffect(() => {
    return function cleanup() {
      metronome.destroy()
    }
  }, [])

  useEffect(() => started ? metronome.start() : metronome.stop(), [started])
  useEffect(() => {
    pattern ? activatePattern() : activateAllNotes()
    setTimeout(() => {
      setNotes(arpeggiator.getNotes())
    }, 2000)
  }, [pattern])

  return (
    <div className="page arpeggiator-demo">
      <h1>Arpeggiator Demo</h1>
      <p>A multimode arpeggiator</p>

      <h2>Instructions</h2>
      <ul>
        <li>Click "START"</li>
        <li>The lights below should light according to the arpeggiator's mode</li>
        <li>Use the mode selector to switch between modes</li>
        <li>Click "PATTERN" to make only selected notes eligible to play</li>
        <li>Use the speed selector to switch between speeds</li>
      </ul>

      <p>
        <button onClick={() => setStarted(!started)}>
          {started ? 'STOP' : 'START'}
        </button>

        <button onClick={() => setPattern(!pattern)}>
          {pattern ? 'ALL' : 'PATTERN'}
        </button>

        <select onChange={evt => metronome.setSpeed(parseInt(evt.target.value, 10))}>
          <option value="4">4</option>
          <option value="8">8</option>
          <option value="16">16</option>
          <option value="32">32</option>
          <option value="64">64</option>
        </select>

        <select onChange={evt => arpeggiator.setMode(evt.target.value as ArpeggiatorMode)}>
          <option value="random">random</option>
          <option value="up">up</option>
          <option value="down">down</option>
        </select>
      </p>

      <p>
        {notes.map((_, noteNumber) => (
          <span
            className="studio-demo-light"
            id={lightId(noteNumber)}
            key={lightId(noteNumber)}
          />
        ))}
      </p>
    </div>
  )
}

export default ArpeggiatorDemo
