import React, { ReactElement, useEffect, useState } from 'react'
import { Arpeggiator, Clock, ClockDivider } from '../../../../lib/classes'

const clock = Clock.getInstance()

const initialDimensions = { x: 8, y: 1 }

const arpeggiator = new Arpeggiator({
  dimensions: initialDimensions,
})

let clockDivider

function lightLight(number: number) {
  const light = document.getElementById('arpeggiator-demo-light-' + number)

  if (!light) return

  light.classList.add('studio__demo-light--lighted')
  setTimeout(() => {
    light.classList.remove('studio__demo-light--lighted')
  }, 100)
}

function initDemo() {
  clockDivider = new ClockDivider({
    ticksPerBeat: 32,
    onTickCallback: () => arpeggiator.getNotes().forEach(lightLight),
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
  clock.unsubscribe(clockDivider)
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
      <p>Requires Google Chrome</p>
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
        <button
          onClick={() => setStarted(!started)}
        >
          {started ? 'STOP' : 'START'}
        </button>
      </p>
      <p className="arpeggiator-demo__lights">
      </p>
    </div>
  )
}

export default ArpeggiatorDemo
